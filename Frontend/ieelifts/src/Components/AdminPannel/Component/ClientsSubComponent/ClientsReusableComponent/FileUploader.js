//------------------------------------Rahul Kumar-------------------------------
import React, { useEffect, useState } from "react";

const FileUploader = ({ label, onFileSelect, apiDataName }) => {
  const [fileName, setFileName] = useState(label);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFileName(file.name);
      onFileSelect(file, label);
    } else {
      setFileName(label);
    }
  };
  // Generate a unique ID for each instance
  const inputId = `fileInput-${label.replace(/\s+/g, "-")}`;
  useEffect(() => {
    if (apiDataName) {
      if (apiDataName instanceof File) {
        setFileName(apiDataName.name);
        onFileSelect(apiDataName, label);
      } else {
        setFileName(apiDataName.split("."[0] + apiDataName.split(".")[1]));
      }
    } else {
      setFileName(label);
    }
  }, [apiDataName, label]);

  return (
    <div className="file-upload">
      <input
        id={inputId}
        type="file"
        className="fileInput"
        onChange={handleFileChange}
      />
      <label htmlFor={inputId} className="filename">
        <span>{fileName}</span>
        <img src="chainIcon.png" className="file-upload-icon" />
      </label>
    </div>
  );
};

export default FileUploader;
