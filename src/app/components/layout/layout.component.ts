import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Challenge } from 'src/app/models/challenge.model';
import { ChallengesService } from '../../services/challenges/challenges.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public challenges: Observable<Challenge[]> = this.challengeService.challengesList$;
    
  @Input() authenticated: boolean;
  constructor(
    private challengeService: ChallengesService
  ) { }

  ngOnInit() {
    this.challengeService.getChallenges();
  }
}
