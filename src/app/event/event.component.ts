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

      if (this.centerLat === 0 && this.centerLng === 0){
        this.centerLat = this.event.spaced_points[0].latitude;
        this.centerLng = this.event.spaced_points[0].longitude;
      }
      this.name = this.event.name;

      // Fill markers
      for (const point of this.event.spaced_points) {
        // Filter out markers that have been claimed
        if (!this.event.claimed_spots.hasOwnProperty(
          encodeURIComponent('' + point.latitude + ',' + point.longitude).replace(/\./g, 'D'))) {
          this.markers.push(
            {
              lat: point.latitude,
              lng: point.longitude,
              draggable: false
            }
          );
        }
      }
    });
  }

  claimPoint(lat, lng) {
    // TO-DO make this wonky string logic a proper function or find a better solution
    this.eventsService.updateEventClaimedSpots(
      this.eventID, encodeURIComponent('' + lat + ',' + lng).replace(/\./g, 'D'));
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
