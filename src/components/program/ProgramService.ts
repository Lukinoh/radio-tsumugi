import {ISchedule} from '../../services/schedule/parsing/ISchedule';

export interface ProgramTableRow {
  key: string;
  label: string;
  data: string;
}

export const getProgramTableData = (schedule: ISchedule): Array<ProgramTableRow> => {
  return [
    {
      key: "1",
      label: 'Show',
      data: schedule.show.current.name
    },
    {
      key: "1",
      label: 'Song',
      data: schedule.song.current.name
    },
    {
      key: "1",
      label: 'Next song',
      data: schedule.song.next.name + ' at ' + schedule.song.next.startTime.format('LTS')
    },
    {
      key: "1",
      label: 'Next show',
      data: schedule.show.next.name + ' at ' + schedule.show.next.startTime.format('LTS')
    }
  ];
};