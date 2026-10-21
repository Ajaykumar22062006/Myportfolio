// IndexedDB storage for resume files to bypass browser localStorage 5MB quota limit

const DB_NAME = 'AjayPortfolioResumeDB';
const DB_VERSION = 1;
const STORE_NAME = 'resume_store';
const RESUME_KEY = 'active_resume';

const openDB = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB is not supported in this environment'));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveResumeToDb = async (resumeData) => {
  if (!resumeData || typeof resumeData !== 'object') return null;

  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      const record = {
        id: RESUME_KEY,
        filename: resumeData.filename || 'ajay-resume.pdf',
        fileType: resumeData.fileType || 'application/pdf',
        base64Content: resumeData.base64Content || '',
        url: resumeData.url || '',
        blobUrl: resumeData.blobUrl || '',
        downloadUrl: resumeData.downloadUrl || '',
        updatedAt: resumeData.updatedAt || new Date().toISOString(),
      };

      const putReq = store.put(record);
      putReq.onsuccess = () => resolve(record);
      putReq.onerror = () => reject(putReq.error);
    });
  } catch (err) {
    console.warn('saveResumeToDb error (fallback to memory/localStorage):', err);
    return null;
  }
};

export const getResumeFromDb = async () => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const getReq = store.get(RESUME_KEY);

      getReq.onsuccess = () => {
        const result = getReq.result;
        if (result && (result.base64Content || result.url || result.blobUrl)) {
          resolve(result);
        } else {
          resolve(null);
        }
      };
      getReq.onerror = () => reject(getReq.error);
    });
  } catch (err) {
    console.warn('getResumeFromDb error:', err);
    return null;
  }
};

export const clearResumeFromDb = async () => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const delReq = store.delete(RESUME_KEY);
      delReq.onsuccess = () => resolve(true);
      delReq.onerror = () => reject(delReq.error);
    });
  } catch (err) {
    console.warn('clearResumeFromDb error:', err);
    return false;
  }
};
