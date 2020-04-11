import React, {useEffect, useState} from 'react';
import {Col, Row, Slider} from 'antd';
import {AppConfigService} from '../../../services/AppConfigService';
import VolumeIcon from './VolumeIcon';
import RadioPlayerButton from './RadioPlayerButton';
import {RadioPlayerState} from './RadioPlayerStateEnum';
import {getCacheBusterUrl} from '../../../services/UtilityService';

interface RadioPlayerProps {
  onError: (message: string) => void;
  onStateChange: (state: RadioPlayerState) => void;
}

function RadioPlayer(props: RadioPlayerProps) {
  const [player] = useState<HTMLAudioElement>(new Audio())
  const [state, setState] = useState<RadioPlayerState>(RadioPlayerState.Stopped);
  const [volume, setVolume] = useState<number>(0.5);

  const {onError, onStateChange} = props;

  useEffect(() => {
    if (state === RadioPlayerState.StartLoading) {
      setState(RadioPlayerState.Loading)
      // Firefox has some cache issue so we have to trick the cache...
      // See https://stackoverflow.com/questions/28245407/audio-and-mozilla-firefox-cache-issue
      player.src = getCacheBusterUrl(AppConfigService.RADIO_URL);
      player.play()
        .then(() => setState(RadioPlayerState.Playing))
        .catch((e) => {
          setState(RadioPlayerState.Error)
          onError(e.message)
        });
    } else if (state === RadioPlayerState.Stopped) {
      player.pause();
    }
  }, [state, onError, player]);

  useEffect(() => {
    player.volume = volume;
  }, [volume, player]);

  useEffect(() => {
    onStateChange(state);
  }, [state, onStateChange]);

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
            <Slider className="RadioPlayer-volume"
                    defaultValue={volume * 100}
                    onChange={(volume: number | any) => setVolume(volume / 100)}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default RadioPlayer;
