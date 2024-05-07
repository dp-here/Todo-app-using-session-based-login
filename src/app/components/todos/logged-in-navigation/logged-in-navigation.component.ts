import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-logged-in-navigation',
  templateUrl: './logged-in-navigation.component.html',
  styleUrls: ['./logged-in-navigation.component.css'],
})
export class LoggedInNavigationComponent implements OnInit {
  constructor(
    private cookieService: CookieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  async logout(): Promise<void> {
    try {
      await this.authService.clearSession().toPromise();
      this.cookieService.deleteAll();
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  }
}
