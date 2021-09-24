export class Challenge {
    title: string;
    description : string;
    tags: Array<string>;
    creationDate: Date;
    votes: number | 0;
    usersVoted: Array<string>;
  }
  