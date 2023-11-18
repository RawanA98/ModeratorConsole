import React from "react";

interface VideoComponentProps {
    embedURL : string;
    videoTitle: string;
    description?: string;
}

export default function VideoComponent({embedURL,videoTitle,description} : VideoComponentProps) {
  return ( 
    <div className="d-flex flex-column gap-2 w-100">
      <iframe
        title="Autoplay Video"
        height="600"
        src={embedURL + '?autoplay=1'}
        allowFullScreen
        sandbox="allow-scripts allow-same-origin"
        allow="autoplay"
      />
      <p className="fs-2 fw-bold">{videoTitle}</p>
      {description && <p className="fs-6">{description}</p>}
    </div>
  )
}
