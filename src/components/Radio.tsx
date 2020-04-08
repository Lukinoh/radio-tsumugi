import React from 'react';
import image from '../assets/tsumugi.gif';
import {Card} from 'antd';

function Radio() {

  const Audio = (
    <audio className="Radio-player"
           src="http://shelter.mahoro-net.org:8000/tsumugi"
           controls
           autoPlay>
      Your browser does not support the audio element.
    </audio>
  );

  const Cover = (
    <img src={image}
         className="Radio-image"
         alt="logo" />
   );

  return (
    <Card className="Radio"
          size="small"
          cover={Cover}>
      {Audio}
    </Card>
  );
}

export default Radio;
