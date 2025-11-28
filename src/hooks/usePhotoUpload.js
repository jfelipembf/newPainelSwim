import { useState, useRef, useCallback } from "react";
import { getStorageHelper } from "../helpers/storage_helper";

export const usePhotoUpload = (pathPrefix = "uploads") => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const objectUrlRef = useRef(null);

  const clearPreview = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setPreviewUrl("");
  };

  const onSelectFile = useCallback((selectedFile) => {
    if (!selectedFile) return;
    clearPreview();
    setFile(selectedFile);
    const localUrl = URL.createObjectURL(selectedFile);
    objectUrlRef.current = localUrl;
    setPreviewUrl(localUrl);
  }, []);

  const reset = useCallback(() => {
    setFile(null);
    clearPreview();
  }, []);

  const upload = useCallback(async () => {
    if (!file) return "";
    const storage = getStorageHelper();
    const uploaded = await storage.uploadPhoto(
      file,
      `${pathPrefix}/${Date.now()}_${file.name}`
    );
    return uploaded.url;
  }, [file, pathPrefix]);

  return {
    file,
    previewUrl,
    onSelectFile,
    upload,
    reset,
  };
};
