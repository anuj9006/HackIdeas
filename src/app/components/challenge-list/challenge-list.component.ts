import { Component, Directive, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Challenge } from 'src/app/models/challenge.model';
import { ChallengesService } from 'src/app/services/challenges/challenges.service';

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.scss']
})
export class ChallengeListComponent implements OnInit {
  @Input() challenges: any;
  @ViewChildren('sortable') sortables!: QueryList<HTMLInputElement>;

  public userId = this.storage.retrieve('userId');
  constructor(
    private storage: LocalStorageService,
    private challengesService: ChallengesService
  ) { }

  ngOnInit(): void {
  }

  public addVote(challenge: Challenge) {
    this.challengesService.addVote(challenge);
  }
  public sort(event: any) {
    this.resetSortables(event);
    if (event.target.getAttribute('class') !== 'asc') {
      event.srcElement.setAttribute('class', 'asc');
      this.sortChallengesAscending(event);
    } else if (event.target.attributes['class']?.value === 'asc') {
      event.srcElement.setAttribute('class', 'desc');
      this.sortChallengesDescending(event);
    }
  }
  public resetSortables(event:any) {
    this.sortables.forEach((element:any) => {
      event.target !== element.nativeElement ? element.nativeElement.setAttribute('class','') : '';
    })
  }
  public sortChallengesAscending(event: any) {
    if (event.target.textContent === 'Votes') {
      this.challenges = this.challenges.sort((a: any, b: any) =>
        a.votes - b.votes
      )
    } else if (event.target.textContent === 'Date') {
      this.challenges = this.challenges.sort((a: any, b: any) =>
        new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
      )
    }
  }
  public sortChallengesDescending(event: any) {
    if (event.target.textContent === 'Votes') {
      this.challenges = this.challenges.sort((a: any, b: any) =>
        b.votes - a.votes
      )
    } else if (event.target.textContent === 'Date') {
      this.challenges = this.challenges.sort((a: any, b: any) =>
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
      )
    }
  }

}