import { Component, OnInit } from '@angular/core';
import { EventsService } from '../shared/events.service';
import { ActivatedRoute, Router } from '@angular/router';

import * as firebase from 'firebase';

declare var google: any;

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class ViewEventComponent implements OnInit {

  markers: marker[] = [];
  private sub: any;
  event: any;
  center_lat: 0;
  center_lng: 0;
  minClusterSize: 50;
  name: '';

  constructor(
    public eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.center_lat);
    this.sub = this.route.params.subscribe(params => {
      this.getEvent(params['eventid']);
    });
  }

  getEvent(eventID) {
    this.eventsService.getEvent(eventID).subscribe(res => {
      this.event = res;
      console.log(this.center_lat);
      // Recenter if at defaults
      this.center_lat = this.event.spaced_points[0].latitude;
      this.center_lng = this.event.spaced_points[0].longitude;

      this.name = this.event.name;

      // Fill markers
      for (let point of this.event.spaced_points) {
        this.markers.push(
          {
            lat: point.latitude,
            lng: point.longitude,
            draggable: false
          }
        );
      }
    });
  }

  claimPoint(lat, lng) {
    console.log(lat, lng);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

// Interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
