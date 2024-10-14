import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  private baseUrl = environment.BASE_URL;
  private rapidApiHost = environment.rapidApiHost;
  private rapidApiKey = environment.rapidApiKey;

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

  getProjects(): Observable<any> {
    const url = `${this.baseUrl}/projects/`;
    return this.http.get(url);
  }

  getSynonyms(word: string): Observable<any> {
    const url = `${this.rapidApiHost}/words/${word}`;

    const headers = new HttpHeaders({
      "x-rapidapi-host": this.rapidApiHost,
      "x-rapidapi-key": this.rapidApiKey,
    });

    return this.http.get(url, { headers });
  }
}
