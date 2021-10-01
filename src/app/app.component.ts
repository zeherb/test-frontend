import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'test-frontend';
  showNav: boolean;
  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log(event.url);
        if (event.url === '/login' || event.url === '/register') {
          this.showNav = false;
        } else {
          this.showNav = true;
        }
      }
    });
  }
  logout() {
    localStorage.removeItem('loginToken');
    this.router.navigate(['/login']);
  }
}
