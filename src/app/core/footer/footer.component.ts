import {Component, OnInit} from '@angular/core';
import {faFacebookSquare, faTwitterSquare, faLinkedin, faInstagramSquare} from '@fortawesome/free-brands-svg-icons';
import {faPhone, faEnvelope} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  facebook = faFacebookSquare;
  twitter = faTwitterSquare;
  linkedin = faLinkedin;
  instagram = faInstagramSquare;
  phone = faPhone;
  mail = faEnvelope;

  constructor() {
  }

  ngOnInit(): void {
  }
}
