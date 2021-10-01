import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  constructor(private router: Router) {}
  checkLoggedIn(): boolean {
    const loginToken = JSON.parse(localStorage.getItem('loginToken')!);
    if (loginToken !== null && loginToken !== undefined) {
      const token = loginToken.token;
      return this.checkTokenIsNotExpired(token);
    } else {
      return false;
    }
  }
  checkTokenIsNotExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    const currentDate = new Date();
    return decoded.exp >= Math.floor(currentDate.getTime() / 1000);
  }
  checkNotConnected(): boolean {
    if (!localStorage.getItem('loginToken')) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
