import './App.css';
import React from "react";
import VideoThumbnail from './Components/Organisms/VideoThumbnail';
import VideoComponent from './Components/VideoComponent';
import ActionsList from './Components/ActionsList';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Col, Container, Row } from 'react-bootstrap';

export const GET_USERS = gql`
  query Query {
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
function App() {
  const [videoTitle, setVideoTitle] = useState<string>('');
  const { loading, error, data, refetch } = useQuery(GET_USERS, {
    onCompleted: (data) => {
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

  //TODO useEffect to refetch query when the url change

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>

  const media = data.moderation.nextTask.media;

  return (
  <div className='m-5'>
    <Row>
      <Col lg={2}>
        <VideoThumbnail imageSrc={media.thumbnailURL} channelName={media.channel.name} category={media.category} />
      </Col>
      <Col lg={7}>
        <VideoComponent embedURL={media.embedURL} videoTitle={videoTitle} description={media.description} />
      </Col>
      <Col lg={3}>
        <ActionsList clientID={media.id} refetch={refetch}/>
      </Col>
    </Row>
  </div>
  );
}

export default App;

