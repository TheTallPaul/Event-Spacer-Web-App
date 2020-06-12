import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() {}

  getPosition() {
    return new Promise<any>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        res => {
          resolve({lng: res.coords.longitude, lat: res.coords.latitude});
        },
        err => {
          reject(err);
        }
      );
    });
  }
}
