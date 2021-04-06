import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EventInfoComponent} from '../event-info/event-info.component';
import {IDay, IEvent} from '../../../models/Calendar';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayComponent implements OnInit {
  @Input() dayData: IDay | undefined;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public dateFormat(timestamp: number): string {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  public onClick(event: IEvent): void {
    this.dialog.open(EventInfoComponent, {
      data: { ...event }
    });
  }
}
