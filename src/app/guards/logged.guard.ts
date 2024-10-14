import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { selectUser } from "../store/user.selector";

@Injectable({
  providedIn: "root",
})
export class LoggedGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectUser).pipe(
      take(1),
      map((user) => {
        if (user && user.username) {
          this.router.navigate(["/"]);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
