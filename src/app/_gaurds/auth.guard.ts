import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable,of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  flag:boolean=false;
  

  constructor(private accountService: AccountService, private toastr: ToastrService) {}

  canActivate(): Observable<boolean>
  {
    this.accountService.currentUser$.pipe
    (
      map
         (
            user => 
                    {
                      if (user) this.flag=true;
                      this.toastr.error('Not authorised to this page')
                    }
          )
    );
    return of(this.flag);  
  }
}
