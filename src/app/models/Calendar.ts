export interface IDay {
  id: number;
  events: Array<IEvent>;
}

export interface IEvent {
  id: number;
  title: string;
  description: string;
  startTime: number;
  finishTime: number;
}

export interface IMonth {
  id: number;
  days: Array<IDay>;
}
