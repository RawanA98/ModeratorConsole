import React from 'react';
import { Container } from 'react-bootstrap';

interface imgContainerProps{
    imageSrc: string;
}

const ImageContainer = ({imageSrc} : imgContainerProps) => {
  return (
    <img src={imageSrc} alt="thumbnail-image" className="object-fit-cover border rounded" style={{width:'250px',height:'150px'}}/>
  );
};

export default ImageContainer;