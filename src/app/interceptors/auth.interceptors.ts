import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { exhaustMap, take } from "rxjs/operators";
import { selectUser } from "../store/user.selector";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(selectUser).pipe(
      take(1),
      exhaustMap((user) => {
        const authToken = user?.accessToken;

        const authReq = authToken
          ? req.clone({
              setHeaders: {
                Authorization: `${authToken}`,
              },
            })
          : req;

        return next.handle(authReq);
      })
    );
  }
}
