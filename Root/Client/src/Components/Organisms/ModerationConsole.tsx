
import React, { useState } from "react";
import VideoThumbnail from "../molecules/VideoThumbnail";
import VideoComponent from "../molecules/VideoComponent";
import ActionsList from "../molecules/ActionsList";
import { gql, useQuery } from "@apollo/client";

//get moderation information
export const GET_MODERATION = gql`
  query getModeration {
      moderation {
          nextTask {
            media {
                category
                channel {
                    name
                    id
                }
                description
                id
                embedURL
                thumbnailURL
                url
            }
          }
      }
  }
`;

export default function ModerationConsole() {
    const [videoTitle, setVideoTitle] = useState<string>('');
    const { loading, error, data, refetch } = useQuery(GET_MODERATION, {
      onCompleted: (data) => {
        //GET VIDEO'S TITLE USING THE EMBED URL.
        const videoId = data.moderation.nextTask.media.embedURL.match(/video\/([^_]+)/)?.[1];
    
        if (videoId) {
          fetch(`https://api.dailymotion.com/video/${videoId}?fields=title`)
          .then(response => response.json())
          .then(data => {
              // Check if the 'title' property exists before accessing it
              if (data && data.title) {
              setVideoTitle(data.title);
              } else {
              setVideoTitle('Video Title Not Available');
              }
          })
          .catch(error => {
              console.error('Error fetching video title:', error);
              setVideoTitle('Error Fetching Video Title');
          });
        }
      }
    });
    
    //Handle the different query state
    if (loading) return <p>Loading...</p>;
    if (!data?.moderation?.nextTask) return <p>There is no next video</p>; // If the nextTask is null
    if (error) return <p>Error: {error.message}</p>;

    const media = data.moderation.nextTask.media;

    return (
        <div className="d-flex flex-column flex-lg-row gap-5 m-5">
            <VideoThumbnail imageSrc={media.thumbnailURL} channelName={media.channel.name} category={media.category} />
            <VideoComponent embedURL={media.embedURL} videoTitle={videoTitle} description={media.description} />
            <ActionsList moderationID={media.id} refetch={refetch}/>
        </div>
    )
}