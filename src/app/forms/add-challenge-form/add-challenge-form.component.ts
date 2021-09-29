import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorageService } from 'ngx-webstorage';
import { Challenge } from 'src/app/models/challenge.model';
import { ChallengesService } from 'src/app/services/challenges/challenges.service';


@Component({
  selector: 'app-add-challenge-form',
  templateUrl: './add-challenge-form.component.html',
  styleUrls: ['./add-challenge-form.component.scss']
})
export class AddChallengeFormComponent implements OnInit {
  public addChallengeForm: FormGroup;
  public errorMessage = '';
  public checked: boolean = false;
  public tags = ['Feature', 'Tech', 'Movie', 'Music', 'Art', 'Dance', 'Machine', 'Dance', 'Mall', 'Photo', 'Sport'];
  public selectedTags :Array<string> = [];
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private storage: SessionStorageService,
    private challengesService: ChallengesService
  ) { }

  ngOnInit(): void {
    this.addFormControls();
  }
  public addChallenge() {
    if (this.addChallengeForm.status === "VALID") {
      this.activeModal.close();
      let userid:any = sessionStorage.getItem('userId');
      const challenge: Challenge = {
        title: this.addChallengeForm.controls.title.value,
        description: this.addChallengeForm.controls.description.value,
        tags: this.selectedTags,
        creationDate: new Date(Date.now()),
        votes: 0,
        usersVoted: [userid]
      }
      this.challengesService.addChallenge(challenge);      
    } else {
      this.errorMessage = 'Please fill all the details';
    }
  }

  private addFormControls() {
    this.addChallengeForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  public addTag(event:any) {
    const tag = event.target.parentElement.innerText;
    !this.selectedTags.includes(tag) ? 
    this.selectedTags.push(tag) :
      this.selectedTags = this.selectedTags.filter(e => e !== tag);
    }
}
