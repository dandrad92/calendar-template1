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
  filteredTimes: string[] = [];
  selectedTime: string | null = null;
  events: any[] = [];
  currentMonth: number;
  currentYear: number;
  daysInMonth: (number | null)[] = [];
  weekdays: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  firstColumnTimes: string[] = [];
  secondColumnTimes: string[] = [];
  today: Date = new Date();

  constructor(private fb: FormBuilder) {
    this.currentMonth = this.today.getMonth();
    this.currentYear = this.today.getFullYear();
    this.eventForm = this.fb.group({
      nombre: [''],
      apellidos: [''],
      startTime: [''],
      endTime: [''],
      modalidad: [''],
      motivoConsulta: [''],
      telefono: [''],
      correo: ['']
    });
  }

  ngOnInit(): void {
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  generateCalendar(month: number, year: number): void {
    this.daysInMonth = [];
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    let startingPoint = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < startingPoint; i++) {
      this.daysInMonth.push(null);
    }

    for (let i = 1; i <= lastDate; i++) {
      this.daysInMonth.push(i);
    }
  }

  previousMonth(): void {
    if (this.currentMonth === this.today.getMonth() && this.currentYear === this.today.getFullYear()) {
      return;
    }

    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  nextMonth(): void {
    const maxDate = new Date(this.today.getFullYear(), this.today.getMonth() + 2, 0);
    const nextMonthDate = new Date(this.currentYear, this.currentMonth + 1, 1);

    if (nextMonthDate > maxDate) {
      return;
    }

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
      const selectedDate = new Date(this.currentYear, this.currentMonth, day);
      const minDate = new Date();
      const maxDate = new Date(this.today.getFullYear(), this.today.getMonth() + 2, 0);

      if (selectedDate < minDate || selectedDate > maxDate) {
        this.selectedDate = null;
        this.filteredTimes = [];
      } else {
        this.selectedDate = selectedDate;
        this.selectedTime = null;  // Clear selected time when date changes
        this.eventForm.patchValue({ startTime: '', endTime: '' });
        this.filterTimes();
      }
    }
  }

  selectTime(time: string): void {
    this.selectedTime = time;
    this.eventForm.patchValue({
      startTime: time,
      endTime: this.calculateEndTime(time)
    });
  }

  calculateEndTime(startTime: string): string {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endTime = new Date();
    endTime.setHours(hours + 1, minutes);
    return `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;
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

  filterTimes(): void {
    if (this.selectedDate) {
      const now = new Date();
      const selectedDateTime = new Date(this.selectedDate.getTime());

      this.filteredTimes = this.availableTimes.filter(time => {
        const [hours, minutes] = time.split(':').map(Number);
        selectedDateTime.setHours(hours, minutes, 0, 0);
        return selectedDateTime.getTime() > now.getTime() + 24 * 60 * 60 * 1000;
      });

      this.firstColumnTimes = this.filteredTimes.slice(0, Math.ceil(this.filteredTimes.length / 2));
      this.secondColumnTimes = this.filteredTimes.slice(Math.ceil(this.filteredTimes.length / 2));
    } else {
      this.filteredTimes = [];
    }
  }

  getFormattedDate(date: Date | null): string {
    if (!date) {
      return '';
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getMonthName(monthIndex: number): string {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[monthIndex];
  }
}
