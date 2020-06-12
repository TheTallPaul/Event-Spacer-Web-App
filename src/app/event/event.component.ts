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
export class EventComponent implements OnInit {

  markers: marker[] = [];
  private sub: any;
  event: any;
  centerLat = 0;
  centerLng = 0;
  name = '';
  eventID = '';
  loadingEvent = true;

  constructor(
    public eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const key = 'eventid';
      this.eventID = params[key];
      this.getEvent(params[key]);
    });
  }

  getEvent(eventID) {
    this.eventsService.getEvent(eventID).subscribe(res => {
      this.event = res;

      // Reposition to the real center and marker as no longer loading
      if (this.event.spaced_points && this.event.spaced_points.length > 0 &&
        this.centerLat === 0 && this.centerLng === 0){
        this.centerLat = this.event.spaced_points[0].latitude;
        this.centerLng = this.event.spaced_points[0].longitude;
        this.loadingEvent = false;
      }

      this.name = this.event.name;

      // Fill markers
      if (this.event.spaced_points && this.event.spaced_points.length > 0) {
        for (const point of this.event.spaced_points) {
          // Filter out markers that have been claimed
          if (!this.event.claimed_spots.hasOwnProperty(
            this.encodeLatLng(point.latitude, point.longitude))) {
            this.markers.push(
              {
                lat: point.latitude,
                lng: point.longitude,
                draggable: false
              }
            );
          }
        }
      }
    });
  }

  claimPoint(lat, lng) {
    this.loadingEvent = true;
    this.eventsService.updateEventClaimedSpots(this.eventID, this.encodeLatLng(lat, lng));
    this.loadingEvent = false;
  }

  encodeLatLng(lat, lng) {
    return encodeURIComponent('' + lat + ',' + lng).replace(/\./g, 'D');
  }

  // TO-DO have cleanup take care of all subs
  /*
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  */
}

// Interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
