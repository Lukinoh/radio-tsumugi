import React, {Fragment} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faVolumeOff, faWifi} from '@fortawesome/free-solid-svg-icons';

interface VolumeIconProps {
  volume: number;
}

function VolumeIcon(props: VolumeIconProps) {
  // I put this here, because the icon is constructed as hack and if you change the size of the icon it will not work anymore.
  const VolumeOnIcon = (
    <Fragment>
      <FontAwesomeIcon size="lg" icon={faWifi} transform="shrink-9 right-3.3 rotate-90" />
      <FontAwesomeIcon size="lg" icon={faVolumeOff}/>
    </Fragment>
  )

  const VolumeOffIcon = (
    <FontAwesomeIcon className="" size="lg" icon={faVolumeOff} />
  );

  const VolumeIcon = props.volume === 0 ? VolumeOffIcon : VolumeOnIcon

  return (
    <span className="fa-layers fa-fw volume-on-icon-color">
      {VolumeIcon}
    </span>
  )
}

export default VolumeIcon;