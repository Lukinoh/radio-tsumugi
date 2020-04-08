import {ajax} from 'rxjs/ajax';
import {Observable, of} from 'rxjs';
import {expand, map, mergeAll, subscribeOn, take, toArray} from 'rxjs/operators';
import {async} from 'rxjs/internal/scheduler/async';
import {toSchedule, toScheduleBridge} from './schedule/parsing/schedule-parser.service';
import {ILocalStorageShow, ISchedule, ISong} from './schedule/parsing/ISchedule';
import moment from 'moment';

class TsumugiServiceFactory {

  getSchedule(delay: number = 0): Observable<ISchedule> {
    return ajax({
      url: 'https://cors-anywhere.herokuapp.com/https://tsumugi.forum-thalie.fr/get_api_result.php',
      responseType: 'text'
    }).pipe(
      subscribeOn(async, delay),
      map(({response}) => toScheduleBridge(response)),
      map((scheduleBridge) => toSchedule(scheduleBridge)),
      expand((schedule) => this.getSchedule(schedule.getNextSongIn()).pipe(take(1))),
    );
  }

  saveHistory(history: Array<ISong>): void {
    localStorage.setItem('history', JSON.stringify(history))
  }

  retrieveHistory(): Observable<Array<ISong>> {
    const rawData = localStorage.getItem('history');
    return of(rawData)
      .pipe(
        map(rawData => rawData ? JSON.parse(rawData) as Array<ILocalStorageShow> : [] as Array<ILocalStorageShow>),
        mergeAll(),
        map(rawHistory => ({
          name: rawHistory.name,
          startTime: moment(rawHistory.startTime),
          endTime: moment(rawHistory.endTime)
        })),
        toArray()
      )

    // const rawHistory: Array<ILocalStorageShow> = data ? JSON.parse(data) : [];

    // rawHistory.forEach((song: any) => {
    //   song.startTime = moment(song.startTime);
    //   song.endTime = moment(song.endTime);
    // });

    // return rawHistory as Array<ISong>;
  }
}

export const TsumugiService = new TsumugiServiceFactory();