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
  center_lat = 0;
  center_lng = 0;
  name = '';
  eventID = '';

  constructor(
    public eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.eventID = params['eventid'];
      this.getEvent(params['eventid']);
    });
  }

  getEvent(eventID) {
    this.eventsService.getEvent(eventID).subscribe(res => {
      this.event = res;

      if (this.center_lat == 0 && this.center_lng == 0){
        this.center_lat = this.event.spaced_points[0].latitude;
        this.center_lng = this.event.spaced_points[0].longitude;
      }
      this.name = this.event.name;

      // Fill markers
      for (let point of this.event.spaced_points) {
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
