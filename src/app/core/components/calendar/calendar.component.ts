import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CalendarService} from '../../services/calendar.service';
import {IMonth} from '../../../models/Calendar';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackbarComponent} from '../snackbar/snackbar.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public calendar: Array<Date> = [];
  public monthIndex = 0;
  public monthTitle = '';
  public monthData: IMonth | undefined;

  constructor(
    private calendarService: CalendarService,
    private snackBar: MatSnackBar,
    private changeDetectionRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.calendar = this.createCalendarDaysList(this.monthIndex);
    this.getSelectedMonthData();
  }

  private getSelectedMonthData(): void {
    const currentMonthIndex = (new Date()).getMonth() + this.monthIndex;
    this.subscription = this.calendarService.getMonthData(currentMonthIndex).subscribe(
      (response: IMonth) => {
        this.monthData = response;
        this.changeDetectionRef.markForCheck();
      },
      error => {
        if (error.status === 404) {
          this.openSnackBar('Этот месяц без эвентов');
        } else if (error.status === 0) {
          this.openSnackBar('Сервер недоступен. Команда для запуска: npm run startServer');
        }
      }
    );
  }

  private openSnackBar(message: string): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 2000
    });
  }

  public getDayData(day: Date): any {
    if (this.monthData?.id === day.getMonth()) {
      return this.monthData?.days.find(i => i.id === day.getDate());
    }
  }

  private createCalendarDaysList(monthIndex: number): Array<Date> {
    const firstCalendarDate: Date = this.getFirstCalendarDate(monthIndex);
    const calendar: Array<Date> = [new Date(firstCalendarDate.setDate(firstCalendarDate.getDate()))];
    for (let i = 0; i < 41; i++) { // 42 ячейки-дня в каждом блоке
      calendar.push(new Date(firstCalendarDate.setDate(firstCalendarDate.getDate() + 1)));
    }
    return calendar;
  }

  private getFirstCalendarDate(monthIndex: number): Date {
    const currentDate: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));
    this.monthTitle = currentDate.toLocaleString('default', { month: 'long' });
    let firstDateOfCalendar: Date = new Date(currentDate.setDate(1));
    let firstDayOfCalendar: number = firstDateOfCalendar.getDay();
    while (firstDayOfCalendar !== 1) {
      firstDateOfCalendar = new Date(currentDate.setDate(currentDate.getDate() - 1));
      firstDayOfCalendar = firstDateOfCalendar.getDay();
    }
    return firstDateOfCalendar;
  }

  public nextMonth(): void {
    this.monthIndex++;
    this.getSelectedMonthData();
    this.calendar = this.createCalendarDaysList(this.monthIndex);
  }

  public previousMonth(): void {
    this.monthIndex--;
    this.getSelectedMonthData();
    this.calendar = this.createCalendarDaysList(this.monthIndex);
  }

  public isActualMonthDay(cellMonth: number): boolean {
    const currentMonthIndex = (new Date()).getMonth() + this.monthIndex;
    return currentMonthIndex === cellMonth;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
