import {ajax} from 'rxjs/ajax';
import {from, Observable, of} from 'rxjs';
import {distinct, expand, map, mergeAll, retry, subscribeOn, take, tap, toArray} from 'rxjs/operators';
import {async} from 'rxjs/internal/scheduler/async';
import {toSchedule, toScheduleBridge} from './schedule-parser/ScheduleParserService';
import {ILocalStorageShow, ISchedule, ISong} from './schedule-parser/ISchedule';
import moment from 'moment';
import {AppConfigService} from '../../services/AppConfigService';

class RadioTsumugiServiceFactory {

  getSchedule(delay: number = 0): Observable<ISchedule> {
    return ajax({
      url: AppConfigService.SCHEDULE_URL,
      responseType: 'text'
    }).pipe(
      // Sometimes a random cors error appears, so we have to retry to call it.
      retry(),
      subscribeOn(async, delay),
      map(({response}) => toScheduleBridge(response)),
      map((scheduleBridge) => toSchedule(scheduleBridge)),
      expand((schedule) => this.getSchedule(schedule.getNextSongIn()).pipe(take(1))),
    );
  }

  retrieveHistory(): Observable<Array<ISong>> {
    const rawHistory = this.getHistoryFromLocalStorage();
    return of(rawHistory)
      .pipe(
        map(rawHistory => (rawHistory ? JSON.parse(rawHistory) : []) as Array<ILocalStorageShow> ),
        mergeAll(),
        map(rawHistory => ({
          name: rawHistory.name,
          startTime: moment(rawHistory.startTime),
          endTime: moment(rawHistory.endTime)
        })),
        toArray()
      )
  }

  saveHistory(schedule: ISchedule, history: Array<ISong>): Observable<Array<ISong>> {
    return from([schedule.song.previous, ...history])
      .pipe(
        distinct(song => song.startTime.toISOString()),
        toArray(),
        tap(history => this.setHistoryToLocaleStorage(history))
      )
  }

  // This two local storage method could be isolated

  private getHistoryFromLocalStorage(): string | null {
    return localStorage.getItem('history');
  }

  private setHistoryToLocaleStorage(history: Array<ISong>) {
    localStorage.setItem('history', JSON.stringify(history))
  }
}

export const RadioTsumugiService = new RadioTsumugiServiceFactory();
