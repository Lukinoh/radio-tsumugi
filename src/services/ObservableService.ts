import {from, Observable} from 'rxjs';
import {filter, toArray} from 'rxjs/operators';

export const filterBy = <T>(array: Array<T>, predicate: (element: T) => boolean): Observable<Array<T>> => {
  return from(array)
    .pipe(
      filter(predicate),
      toArray()
    );
};
