import {fromArray} from 'rxjs/internal/observable/fromArray';
import {distinct, toArray} from 'rxjs/operators';
import {Observable} from 'rxjs';

export class UtilityService {
  private constructor() {}

  static distinctBy<T>(array: Array<T>, fn: (element: T) => string): Observable<Array<T>> {
    return fromArray(array)
      .pipe(
        distinct(element => fn(element)),
        toArray()
      );
  }
}