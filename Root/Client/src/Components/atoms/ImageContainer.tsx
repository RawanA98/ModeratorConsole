import React from 'react';

interface imgContainerProps{
  imageSrc: string;
}

const ImageContainer = ({imageSrc} : imgContainerProps) => {
  return (
    <img src={imageSrc} alt="thumbnail-image" className="object-fit-cover rounded" style={{width:'250px',height:'150px'}}/>
  );
};

export default ImageContainer;