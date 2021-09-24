import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';
import { Challenge } from 'src/app/models/challenge.model';

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {
  
  public challengesUpdate = new Subject();
  
  constructor(
    private storage: LocalStorageService
  ) { }

  public addChallenge(challenge: Challenge) {
      const challenges: Array<Challenge> = this.storage.retrieve('challenges') ? this.storage.retrieve('challenges') : [];
      challenges.push(challenge);
      this.storage.store('challenges', challenges);
      this.challengesUpdate.next();
  }

  public getChallenges(): Challenge[] {
    const challenges:Challenge[] = this.storage.retrieve('challenges') ? this.storage.retrieve('challenges') : [];
    return challenges;
  }
}
