import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Model, ModelFactory } from '@angular-extensions/model';
import { Observable, Subject } from 'rxjs';
import { Challenge } from 'src/app/models/challenge.model';
import { RestService } from '../rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {
  private model: Model<Challenge[]>;
  public challengesUpdate = new Subject();
  public challengesList$: Observable<Challenge[]>;
  constructor(
    private restService: RestService,
    private storage: LocalStorageService,
    private modelFactory: ModelFactory<Array<Challenge>>,
  ) {
    this.model = this.modelFactory.create([]);
    this.challengesList$ = this.model.data$;
  }

  public addChallenge(challenge: Challenge) {
    this.restService.post('/add', challenge).subscribe(data => {
      this.model.set(data);
    }, (error) => {
      console.log(error);
    });
  }

  public getChallenges() {
    //const challenges:Challenge[] = this.storage.retrieve('challenges') ? this.storage.retrieve('challenges') : [];
    this.restService.getRest('/challenges').subscribe((data: any) => {
      this.model.set(data);
    }, (error) => {
      this.model.set([]);
    });
  }

  public addVote(challenge: Challenge) {
    this.restService.put('/addVote', challenge.title).subscribe((data: any) => {
      this.model.set(data);
    }, (error) => {
      console.log(error);
    });
  }
}
