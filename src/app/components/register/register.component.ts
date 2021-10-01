import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  refused: boolean;
  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
  }
  register(form: any) {
    if (form.status == 'VALID') {
      this.authservice.rigister(form.value).subscribe(
        (res) => {},
        (err) => {
          console.log(err);
          if (err.error.message === 'Email already used!') {
            this.refused = true;
          }
        },
        () => {
          this.refused = false;
          this.registerForm.reset();
          this.router.navigate(['login']);
        }
      );
    }
  }
}
