import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, NgForm } from "@angular/forms";
import { LatLngBoundsLiteral } from "@agm/core";

import * as firebase from 'firebase/app';

import { EventsService } from "../shared/events.service";

@Component({
  selector: "app-add-event",
  templateUrl: "./add-event.component.html",
  styleUrls: ["./add-event.component.css"]
})
export class AddEventComponent implements OnInit {
  constructor(public eventsService: EventsService) {}

  ngOnInit(): void {}

  lat: number = 45.509219;
  lng: number = -122.5394805;
  feetToMeters: number = 0.3048;

  // Mill End Park
  north: number = 45.509668;
  east: number = -122.53871;
  south: number = 45.50877;
  west: number = -122.540251;

  onBoundsChange(bounds: LatLngBoundsLiteral) {
    this.north = bounds.north;
    this.east = bounds.east;
    this.south = bounds.south;
    this.west = bounds.west;
  }

  onSubmit() {
    console.warn(this.eventsService.form.value);
    let event = this.eventsService.form.value;
    event.nw_boundary = new firebase.firestore.GeoPoint(this.north, this.west);
    event.se_boundary = new firebase.firestore.GeoPoint(this.south, this.east);
    //convert to meters
    event.spacing_meters = event.spacing_meters * this.feetToMeters

    this.eventsService.createEvent(event)
      .then(res => {console.log(event)});
  }
}
