import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Challenge } from 'src/app/models/challenge.model';
import { ChallengesService } from '../../services/challenges/challenges.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public challenges: Challenge[];/* = [
    {
      title: 'abc',
      description : 'Challenge 1',
      tags: ['feature', 'tech'],
      creationDate: new Date('12/12/2021'),
      votes: 0,
      usersVoted:[]
    },
    {
      title: 'xyz',
      description : 'Challenge 2',
      tags: ['tag1', 'tag2'],
      creationDate: new Date('12/12/2021'),
      votes: 0,
      usersVoted:[]
    }
  ]*/

  @Input() authenticated: boolean;
  constructor(
    private storage: LocalStorageService,
    private challengeService: ChallengesService
  ) { }

  ngOnInit() {
    this.subscribeChallenges();
    this.challengeService.challengesUpdate.next();
  }
  private subscribeChallenges() {
    this.challengeService.challengesUpdate.subscribe(() => {
      this.challenges = this.challengeService.getChallenges();
    })
  }
}
