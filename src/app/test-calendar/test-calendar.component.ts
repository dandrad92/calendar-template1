import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Apollo, gql } from 'apollo-angular';

const GET_EVENTS = gql`query ListAppointments { listAppointments { id nombre apellido description day startTime endTime location modalidad motivo telefono email status } }`;


const CREATE_EVENT = gql`
  mutation CreateAppointment(
    $nombre: String!
    $apellido: String!
    $description: String
    $day: AWSDateTime!
    $startTime: AWSDateTime!
    $endTime: AWSDateTime!
    $location: String
    $modalidad: String
    $motivo: String
    $telefono: AWSPhone
    $email: AWSEmail
    $status: String
  ) {
    createAppointment(
      nombre: $nombre
      apellido: $apellido
      description: $description
      day: $day
      startTime: $startTime
      endTime: $endTime
      location: $location
      modalidad: $modalidad
      motivo: $motivo
      telefono: $telefono
      email: $email
      status: $status
    ) {
      id
      nombre
      apellido
      description
      day
      startTime
      endTime
      location
      modalidad
      motivo
      telefono
      email
      status
    }
  }
`;

const DELETE_EVENT = gql`mutation DeleteAppointment($id: ID!) { deleteAppointment(id: $id) { id nombre apellido description day startTime endTime location modalidad motivo telefono email status } }
`;

const UPDATE_EVENT = gql`
  mutation UpdateAppointment($id: ID!, $nombre: String, $apellido: String, $description: String, $day: AWSDateTime, $startTime: AWSDateTime, $endTime: AWSDateTime, $location: String, $modalidad: String, $motivo: String, $telefono: AWSPhone, $email: AWSEmail, $status: String) { 
  updateAppointment(id: $id, nombre: $nombre, apellido: $apellido, description: $description, day: $day, startTime: $startTime, endTime: $endTime, location: $location, modalidad: $modalidad, motivo: $motivo, telefono: $telefono, email: $email, status: $status) 
  { id nombre apellido description day startTime endTime location modalidad motivo telefono email status } }
`;
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
  modalidadOptions: string[] = ['Online', 'Presencial', 'Telefónica'];
  motivoConsultaOptions: string[] = ['Consulta General', 'Revisión', 'Emergencia'];
  firstColumnTimes: string[] = [];
  secondColumnTimes: string[] = [];
  today: Date = new Date();
  submitted = false;
  showError = false; 
  editMode = false;
  editEventId: string | null = null;

  constructor(private fb: FormBuilder, private apollo: Apollo) {
    this.currentMonth = this.today.getMonth();
    this.currentYear = this.today.getFullYear();
    this.eventForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      modalidad: ['', Validators.required],
      
      motivoConsulta: ['', Validators.required],
      telefono: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
        Validators.maxLength(12)
      ]],
      correo: ['', Validators.required],
    });
    
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
        this.events = data.listAppointments;
        this.filterAvailableTimes();
      }
    }, (error) => {
      console.error('Error fetching events:', error);
    });
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
      nombre: event.title,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      apellido: event.participant
    });
  }

  get f() { return this.eventForm.controls; }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.generateCalendar(this.currentMonth, this.currentYear);
    this.fetchEvents();
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
    this.submitted = true;
    if(this.eventForm.valid){
      
      console.log("Formulario independiente válido:", this.eventForm.value);
      // También puedes asegurarte de que los mensajes de error no se muestren
      this.events.push(event);
      this.eventForm.reset();
      this.selectedDate = null;
      this.selectedTime = null;
     
    }
    else {
      this.showError = true;
      // Ocultar el mensaje de error después de 5 segundos
      setTimeout(() => {
        this.showError = false;
      }, 10000);
      this.eventForm.markAllAsTouched();
    }
  }
  

  addEvent1() {
    if (this.eventForm.valid) {
      const selectedDate = this.selectedDate ? this.selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
  
      const rawStartTime = this.eventForm.value.startTime;
      const rawEndTime = this.eventForm.value.endTime;
  
      console.log('Raw start time:', rawStartTime);
      console.log('Raw end time:', rawEndTime);
  
      let startTime: string;
      let endTime: string;
  
      try {
        startTime = this.convertToISODate(selectedDate, rawStartTime);
        endTime = this.convertToISODate(selectedDate, rawEndTime);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Start time or end time is invalid:', error.message);
        } else {
          console.error('Start time or end time is invalid:', error);
        }
        return; // Stop execution if startTime or endTime is invalid
      }
  
      const formattedPhone = this.formatPhoneNumber(this.eventForm.value.telefono);
  
      if (!formattedPhone) {
        console.error('Invalid phone number format');
        return; // Stop execution if phone number is invalid
      }
  
      const eventData = {
        nombre: this.eventForm.value.nombre,
        apellido: this.eventForm.value.apellido,
        description: this.eventForm.value.description,
        day: `${selectedDate}T00:00:00Z`,
        startTime: startTime,
        endTime: endTime,
        location: this.eventForm.value.location,
        modalidad: this.eventForm.value.modalidad,
        motivo: this.eventForm.value.motivo,
        telefono: formattedPhone,
        email: this.eventForm.value.correo,
        status: 'scheduled'
      };
  
      console.log('Event Data:', eventData); // Log the event data
  
      this.apollo.mutate({
        mutation: CREATE_EVENT,
        variables: eventData
      }).subscribe({
        next: (result) => {
          console.log('Event created', result);
          // Handle successful creation
        },
        error: (error) => {
          console.error('Error adding event:', error);
        }
      });
    } else {
      console.log('Form is invalid');
      // Handle form invalid case
    }
  }
  
  convertToISODate(date: string, time: string): string {
    const datetime = `${date}T${time}:00Z`;
    const dateObj = new Date(datetime);
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }
    return dateObj.toISOString();
  }
  formatPhoneNumber(phone: string): string | null {
    // Assuming the phone number is in the format '1234567890'
    const phoneNumberPattern = /^[0-9]{10}$/;
    if (phoneNumberPattern.test(phone)) {
      return `+1${phone}`; // Assuming country code +1 (USA). Adjust as needed.
    }
    return null;
  }
  
  
  addEvent3(): void {
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
  resetForm(): void {
    this.eventForm.reset();
    this.editMode = false;
    this.editEventId = null;
    this.filteredTimes = [];
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
  get phoneNumber() {
    return this.eventForm.get('phoneNumber');
  }
}
