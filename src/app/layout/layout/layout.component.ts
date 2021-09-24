import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Challenge } from 'src/app/models/challenge.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public challenges:Challenge[] = [
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
  ]

  @Input() authenticated: boolean;
  constructor(
    private storage: LocalStorageService
  ) { }

  ngOnInit(): void {
  }

  public addVote(challenge: Challenge) {
    const objIndex = this.challenges.findIndex((cg => cg.title == challenge.title));
    if(!this.challenges[objIndex].usersVoted.includes(this.storage.retrieve('userId'))) {
      this.challenges[objIndex].votes +=1;
      this.challenges[objIndex].usersVoted.push(this.storage.retrieve('userId'));
    }    
  }

}
