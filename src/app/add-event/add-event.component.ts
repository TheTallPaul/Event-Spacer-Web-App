import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm } from '@angular/forms';
import { LatLngBoundsLiteral } from '@agm/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as firebase from 'firebase/app';

import { EventsService } from '../shared/events.service';
import { LocationService } from '../shared/location.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  centerLat = 45.509219;
  centerLng = -122.5394805;
  feetToMeters = 0.3048;
  boxSize = 0.001

  // Mill End Park
  northBound = 45.509668;
  eastBound = -122.53871;
  southBound = 45.50877;
  westBound = -122.540251;

  constructor(
    public eventsService: EventsService,
    private locationService: LocationService,
    // private route: ActivatedRoute,
    // private router: Router
  ) {}

  ngOnInit() {
    this.locationService.getPosition().then(pos=> {
      this.centerLat = pos.lat;
      this.centerLng = pos.lng;
      this.northBound = this.centerLat + this.boxSize;
      this.eastBound = this.centerLng + this.boxSize;
      this.southBound = this.centerLat - this.boxSize;
      this.westBound = this.centerLng - this.boxSize;
    });
  }

  onBoundsChange(bounds: LatLngBoundsLiteral) {
    this.northBound = bounds.north;
    this.eastBound = bounds.east;
    this.southBound = bounds.south;
    this.westBound = bounds.west;
  }

  onSubmit() {
    const event = this.eventsService.form.value;

    // Build boundary points
    event.nw_boundary = new firebase.firestore.GeoPoint(this.northBound, this.westBound);
    event.se_boundary = new firebase.firestore.GeoPoint(this.southBound, this.eastBound);

    // Convert to meters
    event.spacing_meters *= this.feetToMeters;

    this.eventsService.createEvent(event)
      .then(res => {
        // this.router.navigate(['/view-event/' + res.id]);
      });
  }
}
