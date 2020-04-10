import React, { Fragment } from 'react';
import {Button} from 'antd';
import {getFaIcon} from '../../../components/FaIcon';
import {faPlay, faStop} from '@fortawesome/free-solid-svg-icons';
import {Player} from './RadioPlayer';

export interface IRadioPlayerButton {
  play: () => void;
  stop: () => void;
  status: Player;
}

function RadioPlayerButton(props: IRadioPlayerButton) {

  const PlayButton = (
    <Button icon={getFaIcon(faPlay)}
            onClick={props.play} />
  );

  const StopButton = (
    <Button icon={getFaIcon(faStop)}
            onClick={props.stop} />
  );

  const LoadingButton = (
    <Button loading={true} />
  );

  const buttons = {
    [Player.Paused]: PlayButton,
    [Player.Playing]: StopButton,
    [Player.Loading]: LoadingButton,
    [Player.Error]: null
  }

  return (
    <Fragment>
      {buttons[props.status]}
    </Fragment>
  );
}

export default RadioPlayerButton;