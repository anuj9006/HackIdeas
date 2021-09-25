import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Challenge } from 'src/app/models/challenge.model';
import { ChallengesService } from 'src/app/services/challenges/challenges.service';

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.css']
})
export class ChallengeListComponent implements OnInit {
  @Input() challenges: any;
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
}
