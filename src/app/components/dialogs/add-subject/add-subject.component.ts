import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css'],
})
export class AddSubjectComponent implements OnInit {
  subjectForm: FormGroup;
  constructor(
    private subjectService: SubjectService,
    private dialogRef: MatDialogRef<AddSubjectComponent>
  ) {}

  ngOnInit(): void {
    this.subjectForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }
  createSubject(form: any) {
    if (form.status == 'VALID') {
      this.subjectService.create(form.value).subscribe(
        (res) => {},
        (err) => {
          console.log(err);
        },
        () => {
          this.dialogRef.close(true);
        }
      );
    }
  }
}
