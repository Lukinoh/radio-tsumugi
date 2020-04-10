import React, {useEffect, useState} from 'react';
import {Col, Row, Slider} from 'antd';
import {AppConfigService} from '../../../services/AppConfigService';
import VolumeIcon from './VolumeIcon';
import RadioPlayerButton from './RadioPlayerButton';

export enum Player {
  Loading,
  Playing,
  Paused,
  Error
}

interface RadioPlayerProps {
  onError: (message: string) => void;
}

function RadioPlayer(props: RadioPlayerProps) {
  const [player] = useState<HTMLAudioElement>(new Audio(AppConfigService.RADIO_URL))
  const [state, setState] = useState<Player>(Player.Loading);
  const [volume, setVolume] = useState<number>(50);

  useEffect(() => {
    play();
  }, []);

  const stop = () => {
    player.pause();
    setState(Player.Paused);
  };

  const play = () => {
    setState(Player.Loading);
    player.load();
    player.play()
      .then(() => setState(Player.Playing))
      .catch((e) => {
        setState(Player.Error)
        props.onError(e.message)
      });
  };

  return (
    <Row align="middle" justify="center" gutter={8}>
      <Col>
        <RadioPlayerButton play={play}
                           stop={stop}
                           status={state}
        />
      </Col>
      <Col flex="100px">
        <Row align="middle">
          <Col>
            <VolumeIcon volume={volume} />
          </Col>
          <Col flex="auto">
            <Slider className="Radio-volume"
                    defaultValue={volume}
                    onChange={(volume: number | any) => setVolume(volume / 100)}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default RadioPlayer;
