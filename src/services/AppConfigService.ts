import {Observable, of, throwError} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {mergeMap, tap} from 'rxjs/operators';

interface AppConfig {
  radioUrl: string;
  scheduleUrl: string;
}

export class AppConfigService {

  static RADIO_URL: string;
  static SCHEDULE_URL: string;

  private constructor() {
  }

  static fetch(): Observable<AppConfig> {
    return ajax.getJSON<AppConfig>('./config.json')
      .pipe(
        mergeMap(appConfig => !appConfig ? throwError('No configuration for the application was found.') : of(appConfig)),
        tap((appConfig) => {
          AppConfigService.RADIO_URL = appConfig.radioUrl;
          AppConfigService.SCHEDULE_URL = appConfig.scheduleUrl;
        })
      );
  }
}