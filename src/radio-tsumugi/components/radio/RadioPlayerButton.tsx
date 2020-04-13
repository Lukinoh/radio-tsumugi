import React, { Fragment } from 'react';
import {Button} from 'antd';
import {getFaIcon} from '../../../components/FaIcon';
import {faPlay, faStop} from '@fortawesome/free-solid-svg-icons';
import {RadioPlayerState} from './RadioPlayerStateEnum';

export interface IRadioPlayerButton {
  onChange: (status: RadioPlayerState) => void;
  status: RadioPlayerState;
}

function RadioPlayerButton(props: IRadioPlayerButton) {

  const PlayButton = (
    <Button icon={getFaIcon(faPlay)}
            size="large"
            onClick={() => props.onChange(RadioPlayerState.StartLoading)} />
  );

  const StopButton = (
    <Button icon={getFaIcon(faStop)}
            size="large"
            onClick={() => props.onChange(RadioPlayerState.Stopped)} />
  );

  const LoadingButton = (
    <Button loading={true}
            size="large" />
  );

  const buttons = {
    [RadioPlayerState.Stopped]: PlayButton,
    [RadioPlayerState.Playing]: StopButton,
    [RadioPlayerState.Loading]: LoadingButton,
    [RadioPlayerState.StartLoading]: LoadingButton,
    [RadioPlayerState.Error]: null
  }

  return (
    <Fragment>
      {buttons[props.status]}
    </Fragment>
  );
}

export default RadioPlayerButton;