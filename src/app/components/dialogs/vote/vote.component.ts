import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css'],
})
export class VoteComponent implements OnInit {
  voteCount: number;
  yesCount: number;
  noCount: number;
  yesPourcent: any;
  noPourcent: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private voteService: VoteService,
    private dialogRef: MatDialogRef<VoteComponent>
  ) {}

  ngOnInit(): void {
    this.voteCount = 0;
    this.yesCount = 0;
    this.noCount = 0;
    this.data.subject.votes.forEach((element: any) => {
      if (element.vote == false) {
        this.noCount++;
      } else if (element.vote == true) {
        this.yesCount++;
      }
      this.voteCount++;
    });

    this.yesPourcent =
      (
        Math.round(((this.yesCount * 100) / this.voteCount) * 100) / 100
      ).toFixed(2) || 0;
    this.noPourcent =
      (Math.round(((this.noCount * 100) / this.voteCount) * 100) / 100).toFixed(
        2
      ) || 0;
  }
  vote(vote: boolean) {
    const body = {
      owner: this.data.user._id,
      subject: this.data.subject._id,
      vote: vote,
    };
    this.voteService.createVote(body).subscribe(
      (res) => {},
      (err) => {
        console.log(err);
        this.dialogRef.close(false);
      },
      () => {
        this.dialogRef.close(true);
      }
    );
  }
}
