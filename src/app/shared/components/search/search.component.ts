import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { OwnInfoService } from '../../services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('usernameInput') usernameInput;

  @Output() nameOut = new EventEmitter;

  username;
  photo;

  constructor( private router: Router, private service: OwnInfoService, private sanitizer: DomSanitizer ) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');

    this.service.createService().subscribe(data => {
      let response = data;

      this.photo = this.sanitizer.bypassSecurityTrustStyle(`url(${response.data.viewer.avatarUrl})`);
    });
  }

  submitUsername(event) {
    event.preventDefault();

    localStorage.setItem('username', this.usernameInput.nativeElement.value);

    this.nameOut.emit(localStorage.getItem('username'));

    this.router.navigate(['/username/'+localStorage.getItem('username')]);
  }
}
