import { Component, OnInit } from '@angular/core';
import { EventsService } from '../shared/events.service';
import { ActivatedRoute, Router } from '@angular/router';

import * as firebase from 'firebase';

declare var google: any;

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {

  markers: marker[] = [];
  private sub: any;
  event: any;
  center_lat: 0;
  center_lng: 0;
  minClusterSize: 100;

  constructor(
    public eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.getEvent(params['eventid']);
    });
  }

  getEvent(eventID) {
    this.eventsService.getEvent(eventID).subscribe(res => {
      this.event = res;
      // Recenter if at defaults
      this.center_lat = this.event.spaced_points[0].latitude;
      this.center_lng = this.event.spaced_points[0].longitude;

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
