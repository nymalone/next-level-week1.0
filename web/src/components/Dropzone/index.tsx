import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

import "./styles.css";

interface Props {
  onFileUploaded: (file: File) => void; //void é pq ele não tem retorno, se fosse uma função que retorna algo, aqui colocaríamos o tipo de retorno.
}

const Dropzone: React.FC<Props>  = ({onFileUploaded}) => {
  //preview da imagem que foi selecionada pelo usuário
  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]; //como eu sempre vou ter um arquivo ele sempre vai estar na primeira prosição

    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Point thumbnail" />
      ) : (
        <p>
          <FiUpload />
          Imagem do estabelecimento
        </p>
      )}
    </div>
  );
};

export default Dropzone;
