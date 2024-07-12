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
  filteredTimes: string[] = [];
  firstColumnTimes: string[] = [];
  secondColumnTimes: string[] = [];

  constructor(private fb: FormBuilder) {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.eventForm = this.fb.group({
      startTime: [''],
      endTime: [''],
      nombre: [''],
      apellidos: [''],
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
      this.filterAvailableTimes();
      this.selectedTime = null;
      this.eventForm.patchValue({
        startTime: '',
        endTime: ''
      });
    }
  }

  filterAvailableTimes(): void {
    const now = new Date();
    const selectedDateTime = this.selectedDate ? new Date(this.selectedDate.getTime()) : null;

    if (selectedDateTime) {
      this.filteredTimes = this.availableTimes.filter(time => {
        const [hours, minutes] = time.split(':').map(Number);
        const timeDate = new Date(selectedDateTime);
        timeDate.setHours(hours, minutes, 0);

        return timeDate.getTime() - now.getTime() >= 24 * 60 * 60 * 1000;
      });

      const middleIndex = Math.ceil(this.filteredTimes.length / 2);
      this.firstColumnTimes = this.filteredTimes.slice(0, middleIndex);
      this.secondColumnTimes = this.filteredTimes.slice(middleIndex);
    } else {
      this.filteredTimes = [];
      this.firstColumnTimes = [];
      this.secondColumnTimes = [];
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
    return this.formatTime(endTime);
  }

  formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
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

  getFormattedDate(date: Date | null): string {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('es-ES', options).format(date);
  }
}
