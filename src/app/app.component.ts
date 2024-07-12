import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestCalendarComponent } from './test-calendar/test-calendar.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    TestCalendarComponent
  ]
})
export class AppComponent {
  title = 'my-app';
}