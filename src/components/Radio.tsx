import React from 'react';
import image from '../assets/tsumugi.gif';
import {Card} from 'antd';

function Radio() {
  return (
    <Card className="Radio" size="small" cover={
      <img src={image} className="Radio-image" alt="logo" />
    }>
      <audio className="Radio-player" src="http://shelter.mahoro-net.org:8000/tsumugi" controls autoPlay>}
        Your browser does not support the audio element.
      </audio>
    </Card>
  );
}

export default Radio;
