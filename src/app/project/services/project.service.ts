import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  private baseUrl = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  createProject(title: string, description: string): Observable<any> {
    const url = `${this.baseUrl}/projects/`;

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    const body = {
      title,
      description,
    };

    return this.http.post(url, body, { headers });
  }

  getProjects(token: string): Observable<any> {
    const url = `${this.baseUrl}/projects/`;
    return this.http.get(url);
  }
}
