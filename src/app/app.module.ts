import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer'
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';

import { AddEventComponent } from './add-event/add-event.component';
import { ViewEventComponent } from './event/event.component';
import { EventsService } from './shared/events.service';

const appRoutes: Routes = [
  { path: 'add-event', component: AddEventComponent },
  { path: 'event/:eventid', component: ViewEventComponent},
  { path: '',
    redirectTo: '/add-event',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AddEventComponent,
    ViewEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot(
      appRoutes
    ),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCwq3WJZd2uzeTAPX04jgCmOtUy59X4sFc',
      libraries: ['drawing']
    }),
    AgmSnazzyInfoWindowModule,
    AgmJsMarkerClustererModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
