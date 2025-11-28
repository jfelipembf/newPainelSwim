import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

class StorageHelper {
  constructor() {
    // Ensure Firebase is initialized
    if (!firebase.apps.length) {
      throw new Error('Firebase app not initialized');
    }

    this.storage = firebase.storage();
  }


  uploadPhoto = (file, path) => {
    return new Promise((resolve, reject) => {
      const storageRef = this.storage.ref();
      const fileRef = storageRef.child(path);

      const uploadTask = fileRef.put(file);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          reject(this._handleError(error));
        },
        () => {
          // Upload completed successfully
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            resolve({
              url: downloadURL,
              path: path,
              name: file.name,
              size: file.size,
              type: file.type
            });
          });
        }
      );
    });
  };

  getPhotoUrl = (path) => {
    return new Promise((resolve, reject) => {
      const storageRef = this.storage.ref();
      const fileRef = storageRef.child(path);

      fileRef.getDownloadURL()
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          reject(this._handleError(error));
        });
    });
  };

  listUserPhotos = (userType, userId) => {
    return new Promise((resolve, reject) => {
      const storageRef = this.storage.ref();
      const photosRef = storageRef.child(`${userType}/${userId}/photos/`);

      photosRef.listAll()
        .then((result) => {
          const photos = result.items.map((itemRef) => ({
            name: itemRef.name,
            path: itemRef.fullPath,
            url: null // Will be populated when needed
          }));
          resolve(photos);
        })
        .catch((error) => {
          reject(this._handleError(error));
        });
    });
  };

  deletePhoto = (path) => {
    return new Promise((resolve, reject) => {
      const storageRef = this.storage.ref();
      const fileRef = storageRef.child(path);

      fileRef.delete()
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(this._handleError(error));
        });
    });
  };

  updatePhoto = (oldPath, newFile, newPath) => {
    return new Promise((resolve, reject) => {
      this.deletePhoto(oldPath)
        .then(() => {
          return this.uploadPhoto(newFile, newPath);
        })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(this._handleError(error));
        });
    });
  };

  _handleError(error) {
    // Return generic error message for production
    return 'Erro ao processar arquivo. Tente novamente.';
  }
}

let _storageHelper = null;

const initStorageHelper = () => {
  if (!_storageHelper) {
    _storageHelper = new StorageHelper();
  }
  return _storageHelper;
};

const getStorageHelper = () => {
  if (!_storageHelper) {
    _storageHelper = new StorageHelper();
  }
  return _storageHelper;
};

export { initStorageHelper, getStorageHelper };
