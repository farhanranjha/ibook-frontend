import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, switchMap, take } from "rxjs/operators";
import { AuthService } from "../auth/services/auth.service";
import { selectAccessToken } from "../store/user.selector";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private accessTokenError$ = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthService, private store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          if (!this.accessTokenError$.getValue()) {
            this.accessTokenError$.next(true);

            return this.authService.getAccessToken().pipe(
              switchMap((accessToken: string | null) => {
                this.accessTokenError$.next(false);

                if (accessToken) {
                  const newRequest = req.clone({
                    setHeaders: {
                      Authorization: accessToken,
                    },
                  });
                  return next.handle(newRequest);
                } else {
                  return throwError(() => new Error("Unable to refresh access token"));
                }
              }),
              catchError((error) => {
                this.accessTokenError$.next(false);
                return throwError(() => error);
              })
            );
          } else {
            return this.waitNewTokens().pipe(
              switchMap(() => {
                return this.store.select(selectAccessToken).pipe(
                  take(1),
                  switchMap((accessToken: string | null) => {
                    if (accessToken) {
                      const newRequest = req.clone({
                        setHeaders: {
                          Authorization: accessToken,
                        },
                      });
                      return next.handle(newRequest);
                    } else {
                      return throwError(() => new Error("Access token not available"));
                    }
                  })
                );
              })
            );
          }
        }

        const error = err.error?.message || err.statusText;
        return throwError(() => new Error(error));
      })
    );
  }

  private waitNewTokens(): Observable<boolean> {
    const subject = new BehaviorSubject<boolean>(false);
    const waitToken$ = this.accessTokenError$.subscribe((error: boolean) => {
      if (!error) {
        subject.next(true);
        waitToken$.unsubscribe();
      }
    });
    return subject.asObservable();
  }
}
