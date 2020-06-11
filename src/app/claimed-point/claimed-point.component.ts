import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-claimed-point',
  templateUrl: './claimed-point.component.html',
  styleUrls: ['./claimed-point.component.css']
})
export class ClaimedPointComponent implements OnInit {
  private sub: any;
  lat = 0;
  lng = 0;

  constructor(
    private route: ActivatedRoute
  ){}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      // Convert URI to Lat'n'Lng
      const latLngStr = decodeURIComponent(
        params['latLngStr']).replace(/D/g, '.').split(',');
      if(!isNaN(Number(latLngStr[0]))){
        this.lat = Number(latLngStr[0]);
      }
      if(!isNaN(Number(latLngStr[1]))){
        this.lng = Number(latLngStr[1]);
      }
    });
  }
}
