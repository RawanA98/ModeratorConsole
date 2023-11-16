
import React from "react";
import ImageContainer from "../atoms/ImageContainer";

interface VideoThumbnailProps{
    imageSrc: string;
    channelName: string;
    category:string;
}
export default function VideoThumbnail({imageSrc,channelName,category}: VideoThumbnailProps) {
    
    return (<>
        <ImageContainer imageSrc={imageSrc}/>
        <p className="fs-4 fw-bold m-0">{channelName}</p>
        <p className="fs-6 m-0">{category}</p>
      </>)
}
