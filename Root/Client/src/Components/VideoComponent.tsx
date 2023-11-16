import React from "react";

interface VideoComponentProps {
    embedURL : string;
    videoTitle: string;
    description?: string;
}

export default function VideoComponent({embedURL,videoTitle,description} : VideoComponentProps) {
    return ( <div className="container">
        <iframe
          title="Autoplay Video"
          className="w-100"
          height="450"
          src={embedURL + '?autoplay=1'}
          allowFullScreen
          sandbox="allow-scripts allow-same-origin"
          allow="autoplay"
        ></iframe>
        <p className="fs-2 fw-bold">{videoTitle}</p>
        <p className="fs-6">{description}</p>
      </div>)
}
