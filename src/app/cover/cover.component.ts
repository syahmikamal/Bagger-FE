import { Router, Route } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
