import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

const GET_EVENTS = gql`
  query ListEvents {
    listCalendarEvents {
      items {
        id
        title
        description
        startTime
        endTime
        location
        participant
      }
    }
  }
`;

const CREATE_EVENT = gql`
  mutation CreateEvent($input: CreateCalendarEventInput!) {
    createCalendarEvent(input: $input) {
      id
      title
      description
      startTime
      endTime
      location
      participant
    }
  }
`;

const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteCalendarEvent(input: { id: $id }) {
      id
    }
  }
`;

const UPDATE_EVENT = gql`
  mutation UpdateEvent($input: UpdateCalendarEventInput!) {
    updateCalendarEvent(input: $input) {
      id
      title
      description
      startTime
      endTime
      location
      participant
    }
  }
`;

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  events: any[] = [];
  eventForm: FormGroup;
  editMode = false;
  editEventId: string | null = null;
  availableTimes: string[] = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];
  selectedDate: Date | null = null;
  filteredTimes: string[] = [];
  daysOfWeek = ['Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.', 'Dom.'];
  months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  selectedMonth: number;
  selectedYear: number;

  constructor(private apollo: Apollo, private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      location: [''],
      participant: ['']
    });

    const today = new Date();
    this.selectedMonth = today.getMonth();
    this.selectedYear = today.getFullYear();
  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.apollo.watchQuery<any>({
      query: GET_EVENTS,
    })
    .valueChanges
    .subscribe(({ data, loading }) => {
      console.log('Loading:', loading);
      console.log('Data:', data);
      if (data) {
        this.events = data.listCalendarEvents.items;
        this.filterAvailableTimes();
      }
    }, (error) => {
      console.error('Error fetching events:', error);
    });
  }

  addEvent(): void {
    if (this.eventForm.valid) {
      this.apollo.mutate({
        mutation: CREATE_EVENT,
        variables: {
          input: this.eventForm.value
        }
      }).subscribe(({ data }) => {
        console.log('Event added:', data);
        this.fetchEvents(); // Refresh events
        this.resetForm();
      }, (error) => {
        console.error('Error adding event:', error);
      });
    }
  }

  deleteEvent(id: string): void {
    this.apollo.mutate({
      mutation: DELETE_EVENT,
      variables: {
        id: id
      }
    }).subscribe(({ data }) => {
      console.log('Event deleted:', data);
      this.fetchEvents(); // Refresh events
    }, (error) => {
      console.error('Error deleting event:', error);
    });
  }

  editEvent(event: any): void {
    this.editMode = true;
    this.editEventId = event.id;
    this.eventForm.setValue({
      title: event.title,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      participant: event.participant
    });
  }

  updateEvent(): void {
    if (this.eventForm.valid && this.editEventId) {
      this.apollo.mutate({
        mutation: UPDATE_EVENT,
        variables: {
          input: {
            id: this.editEventId,
            ...this.eventForm.value
          }
        }
      }).subscribe(({ data }) => {
        console.log('Event updated:', data);
        this.fetchEvents(); // Refresh events
        this.resetForm();
      }, (error) => {
        console.error('Error updating event:', error);
      });
    }
  }

  resetForm(): void {
    this.eventForm.reset();
    this.editMode = false;
    this.editEventId = null;
    this.filteredTimes = [];
  }

  filterAvailableTimes(): void {
    if (!this.selectedDate) {
      this.filteredTimes = [];
      return;
    }

    const selectedDateStr = this.selectedDate.toISOString().split('T')[0];
    this.filteredTimes = this.availableTimes.filter(time => {
      return !this.events.some(event => {
        const eventDateStr = new Date(event.startTime).toISOString().split('T')[0];
        const eventTimeStr = new Date(event.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        return eventDateStr === selectedDateStr && eventTimeStr === time;
      });
    });
  }

  selectDate(date: Date): void {
    this.selectedDate = date;
    this.filterAvailableTimes();
  }

  selectTime(time: string): void {
    if (!this.selectedDate) return;

    const selectedDateStr = this.selectedDate.toISOString().split('T')[0];
    const startTime = new Date(`${selectedDateStr}T${time}:00`).toISOString();
    const endTime = new Date(new Date(startTime).getTime() + 60 * 60000).toISOString(); // Adding 60 minutes

    this.eventForm.patchValue({ startTime, endTime });
  }

  isTimeAvailable(time: string): boolean {
    return this.filteredTimes.includes(time);
  }

  getDaysInMonth(month: number, year: number): number[] {
    const date = new Date(year, month, 1);
    const days: number[] = [];
    while (date.getMonth() === month) {
      days.push(new Date(date).getDate());
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  getCalendarDates(): any[] {
    const daysInMonth = this.getDaysInMonth(this.selectedMonth, this.selectedYear);
    const firstDayIndex = new Date(this.selectedYear, this.selectedMonth, 1).getDay();
    const prevMonthDays = this.getDaysInMonth(this.selectedMonth - 1 < 0 ? 11 : this.selectedMonth - 1, this.selectedMonth - 1 < 0 ? this.selectedYear - 1 : this.selectedYear);
    const dates = [];

    // Fill in the days from the previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      dates.push({
        day: prevMonthDays[prevMonthDays.length - 1 - i],
        date: new Date(this.selectedYear, this.selectedMonth - 1 < 0 ? 11 : this.selectedMonth - 1, prevMonthDays[prevMonthDays.length - 1 - i]),
        isDisabled: true,
        isSelected: false
      });
    }

    // Fill in the current month days
    for (let day of daysInMonth) {
      const date = new Date(this.selectedYear, this.selectedMonth, day);
      dates.push({
        day,
        date,
        isDisabled: false,
        isSelected: this.selectedDate && this.selectedDate.toDateString() === date.toDateString()
      });
    }

    // Fill in the days from the next month
    const remainingDays = 42 - dates.length; // 6 weeks in a calendar view
    for (let i = 1; i <= remainingDays; i++) {
      dates.push({
        day: i,
        date: new Date(this.selectedYear, this.selectedMonth + 1 > 11 ? 0 : this.selectedMonth + 1, i),
        isDisabled: true,
        isSelected: false
      });
    }

    return dates;
  }

  prevMonth(): void {
    if (this.selectedMonth === 0) {
      this.selectedMonth = 11;
      this.selectedYear--;
    } else {
      this.selectedMonth--;
    }
  }

  nextMonth(): void {
    if (this.selectedMonth === 11) {
      this.selectedMonth = 0;
      this.selectedYear++;
    } else {
      this.selectedMonth++;
    }
  }

  splitTimes(times: string[]): string[][] {
    const third = Math.ceil(times.length / 3);
    return [times.slice(0, third), times.slice(third, third * 2), times.slice(third * 2)];
  }
}
