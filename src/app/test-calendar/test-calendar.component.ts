import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  standalone: true,
  selector: 'app-test-calendar',
  templateUrl: './test-calendar.component.html',
  styleUrls: ['./test-calendar.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class TestCalendarComponent implements OnInit {
  eventForm: FormGroup;
  selectedDate: Date | null = null;
  availableTimes: string[] = [
    '10:00', '11:00', '12:00', '13:00', 
    '17:00', '18:00', '19:00', '20:00'
  ];
  selectedTime: string | null = null;
  events: any[] = [];
  currentMonth: number;
  currentYear: number;
  daysInMonth: (number | null)[] = [];
  weekdays: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  constructor(private fb: FormBuilder) {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.eventForm = this.fb.group({
      startTime: [''],
      endTime: ['']
    });
  }

  ngOnInit(): void {
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  generateCalendar(month: number, year: number): void {
    this.daysInMonth = [];
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Ajustar el punto de inicio basado en el primer día del mes
    let startingPoint = firstDay === 0 ? 6 : firstDay - 1;

    // Rellenar los días antes del primer día del mes
    for (let i = 0; i < startingPoint; i++) {
      this.daysInMonth.push(null);
    }

    // Rellenar los días del mes
    for (let i = 1; i <= lastDate; i++) {
      this.daysInMonth.push(i);
    }
  }

  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  selectDate(day: number | null): void {
    if (day !== null) {
      this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
    }
  }

  selectTime(time: string): void {
    this.selectedTime = time;
    this.eventForm.patchValue({
      startTime: time,
      endTime: this.calculateEndTime(time)
    });
  }

  calculateEndTime(startTime: string | null): string {
    if (!startTime) {
      return '';
    }

    let [hours, minutes] = startTime.split(':').map(Number);

    if (isNaN(hours) || isNaN(minutes)) {
      console.error(`Invalid time format: ${startTime}`);
      return '';
    }

    const endTime = new Date();
    endTime.setHours(hours + 1, minutes);
    return this.formatTime(endTime);
  }

  formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${strMinutes}`;
  }

  addEvent(): void {
    const event = {
      date: this.selectedDate,
      ...this.eventForm.value
    };
    this.events.push(event);
    this.eventForm.reset();
    this.selectedDate = null;
    this.selectedTime = null;
  }

  getMonthName(monthIndex: number): string {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[monthIndex];
  }
}
