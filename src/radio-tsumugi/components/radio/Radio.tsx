import React, {useState, Fragment} from 'react';
import image from '../../../assets/tsumugi.gif';
import {Alert, Card, Typography} from 'antd';
import RadioPlayer from './RadioPlayer';

function Radio() {
  const [messageError, setMessageError] = useState<string>();

  const {Title} = Typography;

  const Cover = (
    <img src={image}
         className="Radio-image"
         alt="logo" />
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

  const hasError = messageError !== undefined;

  return (
    <Fragment>
      <Title level={2}>
        Player
      </Title>
      <Card className="Radio"
            size="small"
            cover={Cover}>
        {!hasError && <RadioPlayer onError={(message: string) => setMessageError(message)} />}
        {hasError && RadioError}
      </Card>
    </Fragment>
  );
}

export default Radio;
