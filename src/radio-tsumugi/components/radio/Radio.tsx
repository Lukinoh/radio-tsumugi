import React, {Fragment, useRef, useState} from 'react';
import image from '../../../assets/tsumugi.gif';
import {Alert, Card, Typography} from 'antd';
import RadioPlayer from './RadioPlayer';
import ReactFreezeframe, {ReactFreezeframeElement} from 'react-freezeframe';
import {RadioPlayerState} from "./RadioPlayerStateEnum";

function Radio() {
  const [messageError, setMessageError] = useState<string>();
  const gif = useRef<ReactFreezeframeElement>();

  const {Title} = Typography;

  const CoverGif = (
    <div className="Radio-image">
      <ReactFreezeframe ref={gif} src={image} options={{trigger: false}} />
    </div>
  );

  const RadioError = (
    <Alert showIcon
           message={"Cannot start the radio"}
           description={messageError}
           type="error"
           onClose={() => window.location.reload()}
           closeText="Try to refresh"
    />
  );

  const manageCoverGif = (state: RadioPlayerState) => {
    const cGif = gif.current!; // Cannot be undefined at this point
    if (state === RadioPlayerState.Playing) {
      cGif.start()
    } else {
      cGif.stop()
    }
  };

  const hasError = messageError !== undefined;

  return (
    <Fragment>
      <Title level={3}>
        Player
      </Title>

      <Card className="Radio"
            size="small"
            cover={CoverGif}>
        {!hasError && <RadioPlayer
            onError={(message: string) => setMessageError(message)}
            onStateChange={(state: RadioPlayerState) => manageCoverGif(state)}
        />}
        {hasError && RadioError}
      </Card>
    </Fragment>
  );
}

export default Radio;
