
# Calendar Template

Este es un proyecto de aplicación de calendario desarrollado con Angular y AWS AppSync. Este documento proporciona una guía paso a paso sobre cómo instalar, configurar y desplegar esta aplicación.

## Características

- Sincronización de calendarios
- Configuración personalizada de pagos y almacenamiento de tarjetas
- Programador de citas personalizable e insertable
- Recordatorios por correo electrónico y SMS
- Conversión de zona horaria para los clientes
- Integraciones con otras aplicaciones
- Descuentos y cupones
- Informes avanzados
- Gestión de citas para grupos, clases o citas individuales
- Insignia opcional "Powered by"
- Cumplimiento con HIPAA (BAA)
- API y CSS personalizados

## Requisitos Previos

- Node.js y npm instalados
- Angular CLI instalado
- Cuenta de AWS configurada
- AWS Amplify CLI instalado y configurado

## Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/dandrad92/calendar-template1.git
cd calendar-template1
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar AWS AppSync

#### a. Crear una Nueva API en AWS AppSync

1. Inicia sesión en AWS Management Console.
2. Navega a AWS AppSync y crea una nueva API GraphQL.
3. Selecciona "Create from scratch" y configura los detalles necesarios.

#### b. Configurar el Esquema de GraphQL

1. Define el esquema en el editor de AWS AppSync:

```graphql
type CalendarEvent @model {
  id: ID!
  title: String!
  description: String
  startTime: AWSDateTime!
  endTime: AWSDateTime!
  location: String
  participant: String
}

type Query {
  getCalendarEvent(id: ID!): CalendarEvent
  listCalendarEvents: [CalendarEvent]
}

type Mutation {
  createCalendarEvent(title: String!, description: String, startTime: AWSDateTime!, endTime: AWSDateTime!, location: String, participant: String): CalendarEvent
  updateCalendarEvent(id: ID!, title: String!, description: String, startTime: AWSDateTime!, endTime: AWSDateTime!, location: String, participant: String): CalendarEvent
  deleteCalendarEvent(id: ID!): CalendarEvent
}
```

2. Guarda el esquema y genera los recursos necesarios.

### 4. Configurar Apollo Client en Angular

#### a. Instalar Dependencias de Apollo Client

```bash
npm install apollo-angular apollo-angular-link-http apollo-client apollo-cache-inmemory graphql-tag graphql
```

#### b. Configurar Apollo Client

Edita `src/app/graphql.module.ts` para configurar Apollo Client:

```typescript
import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

const uri = 'YOUR_APPSYNC_GRAPHQL_ENDPOINT'; // Reemplaza con tu endpoint de AppSync
const auth = setContext((operation, context) => ({
  headers: {
    'x-api-key': 'YOUR_APPSYNC_API_KEY', // Reemplaza con tu API Key de AppSync
  },
}));

export function createApollo(httpLink: HttpLink) {
  return {
    link: auth.concat(httpLink.create({ uri })),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  imports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
```

### 5. Crear Componentes en Angular

#### a. Crear el Componente del Calendario

Crea `calendar.component.ts` y `calendar.component.html` con la funcionalidad necesaria para mostrar y gestionar eventos del calendario.

#### b. Estilizar el Componente del Calendario

Edita `calendar.component.css` para añadir estilos:

```css
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 120px;
}

.container-event {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.header {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
}

.header .logo {
  height: 150px;
  margin-right: 20px;
  flex-shrink: 0;
}

.header h1 {
  margin: 0;
  flex-grow: 1;
  text-align: center;
  align-self: flex-end;
}

.calendar-box {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  max-width: 1200px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.calendar-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 0;
  width: 100%;
}

.calendar-left, .calendar-right {
  width: 45%;
}

.calendar {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.calendar-body {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
}

.calendar-day, .calendar-date {
  width: calc(100% / 7);
  text-align: center;
  padding: 8px;
  box-sizing: border-box;
  margin: 0;
}

.calendar-day {
  font-weight: bold;
}

.calendar-date {
  cursor: pointer;
}

.calendar-date.disabled {
  color: #ccc;
}

.calendar-date.selected {
  background-color: #3f51b5;
  color: white;
  border-radius: 50%;
}

.time-slot-row {
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
}

.time-slot {
  width: 30%;
  margin-bottom: 10px;
}

mat-form-field {
  width: 100%;
  margin-bottom: 16px;
}

button {
  margin-right: 8px;
}

h3 {
  margin: 0;
  padding: 0;
}
```

### 6. Ejecutar la Aplicación Localmente

Para ejecutar la aplicación localmente, utiliza el siguiente comando:

```bash
ng serve
```

Accede a `http://localhost:4200` en tu navegador para ver la aplicación en funcionamiento.

## Despliegue

Para desplegar la aplicación en producción, asegúrate de que la configuración de producción esté habilitada en tu `angular.json` y utiliza el siguiente comando para construir la aplicación:

```bash
ng build --prod
```

Luego, puedes usar servicios como AWS S3, Firebase Hosting, o cualquier otro servicio de hosting para desplegar los archivos generados en la carpeta `dist`.

## Contribuir

Para contribuir a este proyecto, por favor, crea un fork del repositorio, realiza tus cambios y envía un pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
