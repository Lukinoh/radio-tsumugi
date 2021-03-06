import {mergeMap, Observable, of, tap, throwError} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {getCacheBusterUrl} from './UtilityService';

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
    // Need to be sure to not get a cached version of the config
    return ajax.getJSON<AppConfig>(getCacheBusterUrl('./config.json'))
      .pipe(
        mergeMap(appConfig => !appConfig ? throwError(() => new Error('No configuration for the application was found.')) : of(appConfig)),
        tap((appConfig) => {
          AppConfigService.RADIO_URL = appConfig.radioUrl;
          AppConfigService.SCHEDULE_URL = appConfig.scheduleUrl;
        })
      );
  }
}