import {ISchedule, IShow, ISong} from './ISchedule';
import {IScheduleBridge, IShowBridge, ITrackBridge} from './IScheduleBridge';
import moment, {Moment} from 'moment';
import {decodeHTML} from '../../../services/UtilityService';

export const toScheduleBridge = (response: string): IScheduleBridge => {
  // Not use eval...
  // return eval(response) as ISchedule;

  // Smart way to remove first and last character
  return JSON.parse(decodeHTML(response).slice(1, -1)) as IScheduleBridge;
};

export const toSchedule = (bridgeSchedule: IScheduleBridge): ISchedule => {
  return {
    time: moment(bridgeSchedule.schedulerTime),
    song: {
      previous: getSong(bridgeSchedule.previous, bridgeSchedule.timezoneOffset),
      current: getSong(bridgeSchedule.current, bridgeSchedule.timezoneOffset),
      next: getSong(bridgeSchedule.next, bridgeSchedule.timezoneOffset)

    },
    show: {
      current: getShow(bridgeSchedule.currentShow[0], bridgeSchedule.timezoneOffset),
      next: getShow(bridgeSchedule.nextShow[0], bridgeSchedule.timezoneOffset)
    },
    getNextSongIn: function(): number {
      return this.song.next.startTime.diff(this.time, 'milliseconds');
    }
  } as ISchedule
};

// Duplication of getShow and getSong is voluntary, because we are not 100% that ITrackBridge and IShowBridge have
// the same structure

const getSong = (track: ITrackBridge, offsetInSeconds: number | string): ISong => {
  return {
    name: track.name,
    startTime: getTime(track.starts, offsetInSeconds),
    endTime: getTime(track.ends, offsetInSeconds)
  }
};

const getShow = (show: IShowBridge, offsetInSeconds: number | string): IShow => {
  return {
    name: show.name,
    startTime: getTime(show.starts, offsetInSeconds),
    endTime: getTime(show.starts, offsetInSeconds)
  }
};

const getTime = (time: string, offsetInSeconds: number | string): Moment => {
  return moment(time).add(offsetInSeconds, 'seconds');
};

