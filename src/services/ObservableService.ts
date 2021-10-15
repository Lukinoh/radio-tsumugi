import {filter, from, Observable, toArray} from 'rxjs';

export const filterBy = <T>(array: Array<T>, predicate: (element: T) => boolean): Observable<Array<T>> => {
  return from(array)
    .pipe(
      filter(predicate),
      toArray()
    );
};
