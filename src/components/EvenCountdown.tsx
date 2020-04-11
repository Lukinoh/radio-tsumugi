import React from 'react';
import {Statistic} from 'antd';
import {IEvent} from '../radio-tsumugi/services/schedule-parser/ISchedule';

interface EventCountdownProps {
  event: IEvent
}

function EvenCountdown(props: EventCountdownProps) {
  const {Countdown} = Statistic;

  const style = {
    color: 'rgb(0, 0, 0, 0.65)',
    display: 'inline-block',
    fontSize: '14px'
  };

  // TODO: Format should be HH::mm:ss if number bigger than one hour

  return (
    <Countdown prefix="~"
               valueStyle={style}
               value={props.event.startTime.toISOString()}
               format="mm:ss">
    </Countdown>
  );
}

export default EvenCountdown;
