"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ setPict, width }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
      setPict(acceptedFiles);
    },
  });
  return (
    <div
      {...getRootProps()}
      className={`border w-[45%] p-5 flex flex-col rounded-md items-center gap-2 ${
        width == "full" && "w-full"
      }`}
    >
      <input {...getInputProps} />
      <p>Drag and drop files, paste screenshots, or browse</p>
      <p className="p-2 bg-slate-100 w-[80px] rounded cursor-pointer">Browse</p>
      <ul>
        {uploadedFiles.map((file) => (
          <li key={file.name} className="text-light-purple">
            Name File : {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUpload;
