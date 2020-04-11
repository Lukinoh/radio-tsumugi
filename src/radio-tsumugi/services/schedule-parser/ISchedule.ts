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

export interface IEvent {
  name: string;
  startTime: Moment;
  endTime: Moment;
}

export interface ISong extends IEvent {
}

export interface IShow extends IEvent {
}

export interface ILocalStorageShow {
  name: string;
  startTime: string;
  endTime: string;
}