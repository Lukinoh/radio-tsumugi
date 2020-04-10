import {ISchedule, IShow, ISong} from './ISchedule';
import {IScheduleBridge, IShowBridge, ITrackBridge} from './IScheduleBridge';
import moment, {Moment} from 'moment';
import {decodeHTML} from '../../../services/UtilityService';

export const toScheduleBridge = (response: string): IScheduleBridge => {
  // Not use eval...
  // return eval(response) as ISchedule;

  // Smart way to remove first and last character
  // Replace &quot; with "
  // FIXME: There is other stuff to decode like &lt; and the other
  return JSON.parse(decodeHTML(response).slice(1, -1)) as IScheduleBridge;
};

// Offset doit être passé
export const toSchedule = (bridgeSchedule: IScheduleBridge): ISchedule => {
  return {
    time: moment(bridgeSchedule.schedulerTime),
    song: {
      previous: getSong(bridgeSchedule.previous),
      current: getSong(bridgeSchedule.current),
      next: getSong(bridgeSchedule.next)

    },
    show: {
      current: getShow(bridgeSchedule.currentShow[0]),
      next: getShow(bridgeSchedule.nextShow[0])
    },
    getNextSongIn: function(): number {
      return this.song.next.startTime.diff(this.time, 'milliseconds');
    }
  } as ISchedule
};

const getTime = (time: string, offset: number): Moment => {
  return moment(time).add(offset, 'seconds');
};

const getSong = (track: ITrackBridge): ISong => {
  return {
    name: track.name,
    startTime: getTime(track.starts, 7200),
    endTime: getTime(track.ends, 7200)
  }
};

const getShow = (show: IShowBridge): IShow => {
  return {
    name: show.name,
    startTime: getTime(show.starts, 7200),
    endTime: getTime(show.starts, 7200)
  }
};

