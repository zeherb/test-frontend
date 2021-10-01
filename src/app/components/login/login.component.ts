import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  refused: boolean;
  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  login(form: any) {
    if (form.status == 'VALID') {
      this.authservice.login(form.value).subscribe(
        (res) => {
          localStorage.setItem('loginToken', JSON.stringify(res));
        },
        (err) => {
          console.log(err);
          this.refused = true;
        },
        () => {
          this.refused = false;
          this.loginForm.reset();
          this.router.navigate(['home']);
        }
      );
    }
  }
}
