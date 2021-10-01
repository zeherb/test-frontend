import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubjectService } from 'src/app/services/subject.service';
import { AddSubjectComponent } from '../dialogs/add-subject/add-subject.component';
import { VoteComponent } from '../dialogs/vote/vote.component';
import jwtDecode from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allSubjects: any[];
  userId: any;
  connectedUser: any;
  constructor(
    private dialog: MatDialog,
    private subjectService: SubjectService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAllSubject();
    this.userId = jwtDecode<any>(
      JSON.parse(localStorage.getItem('loginToken')!).token
    ).userId;
    this.userService.getById(this.userId).subscribe(
      (res) => {
        this.connectedUser = res;
      },
      (err) => {},
      () => {}
    );
  }
  addSubjectDialog() {
    const dialogRef = this.dialog.open(AddSubjectComponent, {
      height: 'fit-content',
      minWidth: '300px',
      width: '70%',
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.getAllSubject();
      }
    });
  }
  voteDialog(subject: any) {
    const dialogRef = this.dialog.open(VoteComponent, {
      height: 'fit-content',
      minWidth: '300px',
      width: '70%',
      data: { subject: subject, user: this.connectedUser },
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.getAllSubject();
      }
    });
  }

  getAllSubject() {
    this.subjectService.getAll().subscribe(
      (res) => {
        this.allSubjects = res;
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }
}
