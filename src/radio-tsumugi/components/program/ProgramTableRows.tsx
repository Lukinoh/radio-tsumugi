import React, {Fragment} from 'react';
import {IEvent, ISchedule} from '../../services/schedule-parser/ISchedule';
import EvenCountdown from '../../../components/EvenCountdown';
import EventDisplay from "../../../components/EventDisplay";
import {format_HHmm} from "../../../services/ConstantService";

export interface IProgramTableRow {
  key: number;
  label: string;
  event: IEvent;
  renderEvent: (row: IProgramTableRow) => JSX.Element;
  renderLabel: (row: IProgramTableRow) => JSX.Element;
}

const EventName = (row: IProgramTableRow) => (
  <EventDisplay name={row.event.name}/>
);

const LabelName = (row: IProgramTableRow) => (
  <Fragment>
    {row.label}
  </Fragment>
);

const LabelWithCountdown = (row: IProgramTableRow) => (
  <Fragment>
    {row.label} in <EvenCountdown event={row.event}/>
  </Fragment>
);

const LabelWithTime = (row: IProgramTableRow) => (
  <Fragment>
    {row.label} at <div>{row.event.startTime.format(format_HHmm)} </div>
  </Fragment>
);

export const getProgramTableRows = (schedule: ISchedule): Array<IProgramTableRow> => {
  return [
    {
      key: 0,
      label: 'Show',
      event: schedule.show.current,
      renderEvent: EventName,
      renderLabel: LabelName
    },
    {
      key: 1,
      label: 'Song',
      event: schedule.song.current,
      renderEvent: EventName,
      renderLabel: LabelName
    },
    {
      key: 2,
      label: 'Next song',
      event: schedule.song.next,
      renderEvent: EventName,
      renderLabel: LabelWithCountdown
    },
    {
      key: 3,
      label: 'Next show',
      event: schedule.show.next,
      renderEvent: EventName,
      renderLabel: LabelWithTime
    }
  ];
};
