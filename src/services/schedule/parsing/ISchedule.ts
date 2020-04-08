import {Moment} from 'moment';

export interface ISchedule {
  time: Moment;
  song: {
    previous: ISong;
    current: ISong;
    next: ISong;
  }
  show: {
    current: IShow;
    next: IShow;

  },
  getNextSongIn: () => number
}

export interface ISong {
  name: string;
  startTime: Moment;
  endTime: Moment;
}

export interface IShow {
  name: string;
  startTime: Moment;
  endTime: Moment;
}

export interface ILocalStorageShow {
  name: string;
  startTime: string;
  endTime: string;
}