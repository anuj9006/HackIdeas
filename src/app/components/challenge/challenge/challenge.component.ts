import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Challenge } from 'src/app/models/challenge.model';
import { ChallengesService } from 'src/app/services/challenges/challenges.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  @Input() challenge: Challenge;
  constructor(
    private storage: LocalStorageService,
    private challengesService: ChallengesService
  ) { }

  ngOnInit(): void {
  }
  public addVote(challenge: Challenge) {
    const challenges = this.challengesService.getChallenges();
    const objIndex = challenges.findIndex((cg => cg.title == challenge.title));
    if (!challenges[objIndex].usersVoted.includes(this.storage.retrieve('userId'))) {
      challenges[objIndex].votes += 1;
      challenges[objIndex].usersVoted.push(this.storage.retrieve('userId'));
      this.storage.store('challenges', challenges);
    }
  }
}
