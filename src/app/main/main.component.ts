import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('usernameInput') usernameInput;
  @ViewChild('tokenInput') tokenInput;
  @ViewChild('tokenModal') tokenModal;

  token = localStorage.getItem('token');

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  submitUsername(event) {
    event.preventDefault();

    localStorage.setItem('username', this.usernameInput.nativeElement.value);

    this.router.navigate(['/username/'+localStorage.getItem('username')]);
  }

  submitToken(event) {
    event.preventDefault();

    localStorage.setItem('token', this.tokenInput.nativeElement.value);

    this.tokenModal.nativeElement.classList.add('hidden');
  }
}
