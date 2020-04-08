import {ajax} from 'rxjs/ajax';
import {from, Observable, of} from 'rxjs';
import {distinct, expand, map, mergeAll, subscribeOn, take, tap, toArray} from 'rxjs/operators';
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

export const TsumugiService = new TsumugiServiceFactory();