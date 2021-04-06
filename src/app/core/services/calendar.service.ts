import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMonth} from '../../models/Calendar';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private httpClient: HttpClient) { }

  public getMonthData(monthIndex: number): Observable<IMonth> {
    return this.httpClient.get<IMonth>(`http://localhost:3000/months/${monthIndex}` );
  }
}
