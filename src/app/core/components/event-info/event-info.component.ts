import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {IEvent} from '../../../models/Calendar';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventInfoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IEvent) { }

  ngOnInit(): void {
  }

  public getTime(timestamp: number): string {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}`;
  }
}
