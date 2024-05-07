import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { SessionExpiredComponent } from 'src/app/components/session-expired/session-expired.component';


@Injectable({
  providedIn: 'root',
})
export class AuthguardService implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router, public dialog: MatDialog) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> {
    if (this.cookieService.get('sessionID')) {
      return true;
    } else {
      const dialogRef = this.dialog.open(SessionExpiredComponent, {
        
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
      });
      return this.router.navigate(['login']);
    }
  }
}
