import React, {useEffect, useState} from 'react';
import {Col, Row, Slider} from 'antd';
import {AppConfigService} from '../../../services/AppConfigService';
import VolumeIcon from './VolumeIcon';
import RadioPlayerButton from './RadioPlayerButton';

export enum Player {
  Playing = 'PlayerPlaying',
  StartLoading = 'PlayerStartLoading',
  Loading = 'PlayerLoading',
  Stopped = 'PlayerStopped',
  Error = 'PlayerError'
}

interface RadioPlayerProps {
  onError: (message: string) => void;
}

function RadioPlayer(props: RadioPlayerProps) {
  const [player] = useState<HTMLAudioElement>(new Audio())
  const [state, setState] = useState<Player>(Player.Stopped);
  const [volume, setVolume] = useState<number>(50);

  const {onError} = props;

  useEffect(() => {
    if (state === Player.StartLoading) {
      setState(Player.Loading)
      // Firefox has some cache issue so we have to trick the cache...
      // See https://stackoverflow.com/questions/28245407/audio-and-mozilla-firefox-cache-issue
      player.src = AppConfigService.RADIO_URL + '?cache-buster=' + Date.now();
      player.play()
        .then(() => setState(Player.Playing))
        .catch((e) => {
          setState(Player.Error)
          onError(e.message)
        });
    } else if (state === Player.Stopped) {
      player.pause();
    }
  }, [state, onError, player]);

  return (
    <Row align="middle" justify="center" gutter={8}>
      <Col>
        <RadioPlayerButton status={state}
                           onChange={(newState) => setState(newState)}
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
