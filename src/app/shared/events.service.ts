import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  // TO-DO move the spacing to the component
  spacingFeet = 12;

  form = new FormGroup({
    spacing_meters: new FormControl(this.spacingFeet),
    name: new FormControl(''),
    nw_boundary: new FormControl(''),
    se_boundary: new FormControl(''),
  });

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore
  ){}

  createEvent(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('events')
        .add(data)
        .then(
          // TO-DO make this work in the component, not the service
          res => { this.router.navigate(['/event/' + res.id]); },
          err => reject(err)
        );
    });
  }

  getEvent(eventID) {
    return this.firestore.collection('events').doc(eventID).valueChanges();
  }

  updateEventClaimedSpots(eventID, latLngStr) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('events').doc(eventID)
        .update({
          [`claimed_spots.${latLngStr}`]: true
        })
        .then(
          // TO-DO make this work in the component, not the service
          res => { this.router.navigate(['/claimed-point/' + latLngStr]); },
          // TO-DO notify user if claim was rejected
          err => reject(err)
        );
    });
  }
}
