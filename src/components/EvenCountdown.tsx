import React from 'react';
import {Statistic} from 'antd';
import {IEvent} from '../radio-tsumugi/services/schedule-parser/ISchedule';
import {format_mmss} from "../services/ConstantService";

interface EventCountdownProps {
  event: IEvent
}

function EvenCountdown(props: EventCountdownProps) {
  const {Countdown} = Statistic;

  return (
    <Countdown prefix="~"
               className="EventCountdown"
               value={props.event.startTime.toISOString()}
               format={format_mmss}>
    </Countdown>
  );
}

export default EvenCountdown;
