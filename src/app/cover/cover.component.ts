import { Router, Route } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService
  ) { 
    this.spinner.show(undefined,
      {
        // type: 'ball-scale-ripple-multiple',
        // type: 'fire',
        type: 'square-jelly-box',
        size: 'medium',
        bdColor: 'rgba(26,28,35,255)',
        color: '#11cdef',
        fullScreen: true
      });
  }

  ngOnInit(): void {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3500);
  }

}
