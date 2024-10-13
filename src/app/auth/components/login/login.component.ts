import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { FloatLabelModule } from "primeng/floatlabel";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { AuthService } from "../../services/auth.service";
import { User } from "../../../store/user.model";
import { Store } from "@ngrx/store";
import { add } from "../../../store/user.actions";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule, InputTextModule, FloatLabelModule, PasswordModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private authService: AuthService, private store: Store, private router: Router) {}

  submitLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        const user: User = {
          username: response.email,
          accessToken: response.access,
          refreshToken: response.refresh,
        };
        this.store.dispatch(add({ user }));
        this.router.navigate(["/"]);
      },
      error: (error) => {
        console.error("Login failed", error);
      },
    });
  }
}
