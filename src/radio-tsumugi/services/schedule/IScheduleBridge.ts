type SchedulerTimeBridge = string; // 2020-04-06 14:44:06;
type TrackTimeBridge = string; // 2020-04-06 12:41:11.095

enum TypeBridge {
  Track = 'track',
  Show = 'show'
}

export interface IScheduleBridge {
  env: 'production';
  schedulerTime: SchedulerTimeBridge
  previous: ITrackBridge;
  current: ICurrentTrackBridge;
  next: ITrackBridge;
  currentShow: Array<IShowBridge>;
  nextShow: Array<INextShowBridge>;
  timezone: "Europe/Paris";
  timezoneOffset: "7200";
  AIRTIME_API_VERSION: "1.1"
}

export interface ITrackBridge {
  name: string;
  starts: TrackTimeBridge;
  ends: TrackTimeBridge;
  type: TypeBridge.Track
}

interface ICurrentTrackBridge extends ITrackBridge {
  media_item_played: boolean;
  record: number;
}

export interface IShowBridge {
  id: number;
  instance_id: number;
  name: string;
  description: string;
  url: string;
  start_timestamp: SchedulerTimeBridge;
  end_timestamp: SchedulerTimeBridge;
  starts: SchedulerTimeBridge;
  ends: SchedulerTimeBridge
  record: number;
  image_path: string;
}

interface INextShowBridge extends IShowBridge {
  type: TypeBridge.Show;
}