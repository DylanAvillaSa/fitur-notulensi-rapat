"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ setPict, width }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [notFormat, setNotFormat] = useState(false);
  const typeFiles = [".png", ".jpg"];
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const [png, jpg] = typeFiles;
      if (
        acceptedFiles[0].path.includes(png) ||
        acceptedFiles[0].path.includes(jpg)
      ) {
        setUploadedFiles(acceptedFiles);
        setPict(acceptedFiles);
        setNotFormat(false);
      } else {
        setNotFormat(true);
      }
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
            {notFormat ? (
              <p className="text-rose-400 flex flex-col font-medium items-center">
                Format Tidak Sesuai{" "}
                <span className="font-medium">Format : png, Jpg </span>
              </p>
            ) : (
              <p>Nama Gambar : {file.name}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUpload;
