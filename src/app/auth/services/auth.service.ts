import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, switchMap } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { select, Store } from "@ngrx/store";
import { selectRefreshToken } from "../../store/user.selector";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = environment.BASE_URL;

  constructor(private http: HttpClient, private store: Store) {}

  login(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/auth/login/`;

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    const body = {
      username,
      password,
    };
    return this.http.post(url, body, { headers });
  }

  signup(username: string, email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/auth/register/`;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const body = {
      username,
      email,
      password,
    };
    return this.http.post(url, body, { headers });
  }

  getAccessToken(): Observable<string | null> {
    const url = `${this.baseUrl}/auth/refresh/`;
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    return this.store.pipe(
      select(selectRefreshToken),
      switchMap((refreshToken) => {
        if (!refreshToken) {
          return of(null);
        }
        return this.http.post<{ accessToken: string }>(url, { refresh: refreshToken }, { headers }).pipe(
          map((response: any) => {
            const accessToken = response.access;
            if (accessToken) {
              this.store.dispatch(setAccessToken({ accessToken }));
              return accessToken;
            }
            return null;
          }),
          catchError((error: any) => {
            console.error("Error refreshing access token", error);
            return of(null);
          })
        );
      })
    );
  }
}
