import { Component, OnInit } from '@angular/core';
import { faPhone } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {
  faPhone = faPhone

  constructor() { }

  ngOnInit() {
  }

}
