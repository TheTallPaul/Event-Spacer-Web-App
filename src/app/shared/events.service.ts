import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  spacingFeet = 10;

  form = new FormGroup({
    spacing_meters: new FormControl(this.spacingFeet),
    name: new FormControl(''),
    nw_boundary: new FormControl(''),
    se_boundary: new FormControl(''),
  });

  constructor(private firestore: AngularFirestore) {}

  createEvent(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('events')
        .add(data)
        .then(res => {}, err => reject(err));
    });
  }
}
