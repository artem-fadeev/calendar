import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChunkPipe} from './shared/chunk.pipe';
import {CalendarComponent} from './core/components/calendar/calendar.component';
import {CalendarService} from './core/services/calendar.service';
import {HttpClientModule} from '@angular/common/http';
import {DayComponent} from './core/components/day/day.component';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {EventInfoComponent} from './core/components/event-info/event-info.component';
import {SnackbarComponent} from './core/components/snackbar/snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ChunkPipe,
    CalendarComponent,
    DayComponent,
    EventInfoComponent,
    SnackbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [CalendarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
