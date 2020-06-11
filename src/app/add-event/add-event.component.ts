import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm } from '@angular/forms';
import { LatLngBoundsLiteral } from '@agm/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as firebase from 'firebase/app';

import { EventsService } from '../shared/events.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  lat = 45.509219;
  lng = -122.5394805;
  feetToMeters = 0.3048;

  // Mill End Park
  north = 45.509668;
  east = -122.53871;
  south = 45.50877;
  west = -122.540251;

  constructor(
    public eventsService: EventsService,
    // private route: ActivatedRoute,
    // private router: Router
  ) {}

  ngOnInit(): void {}

  onBoundsChange(bounds: LatLngBoundsLiteral) {
    this.north = bounds.north;
    this.east = bounds.east;
    this.south = bounds.south;
    this.west = bounds.west;
  }

  onSubmit() {
    const event = this.eventsService.form.value;

    // Build boundary points
    event.nw_boundary = new firebase.firestore.GeoPoint(this.north, this.west);
    event.se_boundary = new firebase.firestore.GeoPoint(this.south, this.east);

    // Convert to meters
    event.spacing_meters *= this.feetToMeters;

    this.eventsService.createEvent(event)
      .then(res => {
        // this.router.navigate(['/view-event/' + res.id]);
      });
  }
}
