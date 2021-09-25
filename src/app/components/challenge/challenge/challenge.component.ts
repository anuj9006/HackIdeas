import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Challenge } from 'src/app/models/challenge.model';
import { ChallengesService } from 'src/app/services/challenges/challenges.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  @Input() challenge: any;
  constructor(
    private storage: LocalStorageService,
    private restService: RestService,
    private challengesService: ChallengesService
  ) { }

  ngOnInit(): void {
  }
  public addVote(challenge: Challenge) {
    this.challengesService.addVote(challenge);
  }
}
