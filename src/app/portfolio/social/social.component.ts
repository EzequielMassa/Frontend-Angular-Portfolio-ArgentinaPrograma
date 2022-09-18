import { Component, OnInit } from '@angular/core';
import { fadeInLeftOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css'],
  animations: [fadeInLeftOnEnterAnimation()],
})
export class SocialComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
