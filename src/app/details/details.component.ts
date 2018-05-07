import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as _ from "lodash";

import {
  UserInfoService,
  StarsListService,
  StarsPaginationService,
  StarsActionsService
} from '../shared';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
	username;

  cursor;

	photo;

	user = {
		avatarUrl: "",
		bio: "",
		company: "",
		email: "",
		location: "",
		login: "",
		name: "",
		websiteUrl: ""
	};

  error;

  lists;

  sub;

  loader = false;

  noMore = false;

  constructor(
    private service: UserInfoService,
    private starlist: StarsListService,
    private pagination: StarsPaginationService,
    private action: StarsActionsService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.username = params['username'];

      localStorage.setItem('username', this.username);
    });

  	this.service.createService(this.username).subscribe(data => {
      let response = data;

      this.user = response.data.user;

      if(this.user) {
        this.error = "";

        this.photo = this.sanitizer.bypassSecurityTrustStyle(`url(${this.user.avatarUrl})`);
      }else{
        this.error = response.errors[0].type;
      }
    });

    this.loader = true;

    this.starlist.createService(this.username).subscribe(data => {
      let response = data;

      this.lists = response.data.user.starredRepositories.edges;

      if(this.lists.length > 0) {
        localStorage.setItem('cursor', _.last(this.lists).cursor);

        this.noMore = false;
      }else{
        localStorage.removeItem('cursor');

        this.noMore = true;
      }

      this.loader = false;

      this.cursor = localStorage.getItem('cursor');
    });
  }

  updateUser(name) {
  	this.service.createService(name).subscribe(data => {
      let response = data;

      this.user = response.data.user;

      if(this.user) {
        this.error = "";

        this.photo = this.sanitizer.bypassSecurityTrustStyle(`url(${this.user.avatarUrl})`);
      }else{
        this.error = response.errors[0].type;
      }
    });

    this.starlist.createService(name).subscribe(data => {
      let response = data;

      this.lists = response.data.user.starredRepositories.edges;

      if(this.lists.length > 0) {
        localStorage.setItem('cursor', _.last(this.lists).cursor);

        this.noMore = false;
      }else{
        localStorage.removeItem('cursor');

        this.noMore = true;
      }

      this.cursor = localStorage.getItem('cursor');
    });
  }

  @HostListener("window:scroll", ["$event"])
  onScroll() {
    if(localStorage.getItem('cursor') && localStorage.getItem('cursor') != "") {
      let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      let max = document.documentElement.scrollHeight;

      if(pos == max) {
        this.loader = true;

        this.pagination.createService(this.username, this.cursor).subscribe(data => {
          let response = data;

          let newLists = response.data.user.starredRepositories.edges;

          this.lists = this.lists.concat(newLists);

          if(newLists.length > 0) {

            localStorage.setItem('cursor', _.last(newLists).cursor);

            this.noMore = false;
          }else{
            localStorage.removeItem('cursor');

            this.noMore = true;
          }

          this.loader = false;
        });
      }
    }
  }

  onStar(event, id) {
    this.action.createService('addStar', id).subscribe(data => {
      let count = data.data.addStar.starrable.stargazers.totalCount;

      event.target.classList.add('hidden');

      event.target.nextElementSibling.classList.remove('hidden');

      event.target.parentElement.childNodes[1].childNodes[5].childNodes[3].innerText = count;
    });
  }

  onUnstar(event, id) {
    this.action.createService('removeStar', id).subscribe(data => {
      let count = data.data.removeStar.starrable.stargazers.totalCount;

      event.target.classList.add('hidden');

      event.target.previousElementSibling.classList.remove('hidden');

      event.target.parentElement.childNodes[1].childNodes[5].childNodes[3].innerText = count;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
