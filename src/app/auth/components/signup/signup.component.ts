import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { AuthService } from "../../services/auth.service";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ToastModule } from "primeng/toast";
import { ButtonModule } from "primeng/button";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { FloatLabelModule } from "primeng/floatlabel";
import { PasswordModule } from "primeng/password";
import { User } from "../../../store/user.model";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [CommonModule, ToastModule, ButtonModule, FormsModule, InputTextModule, FloatLabelModule, PasswordModule],
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.scss",
  providers: [MessageService],
})
export class SignupComponent {
  constructor(private messageService: MessageService, private authService: AuthService, private router: Router) {}
  username: string = "";
  password: string = "";
  email: string = "";

  submitSignup() {
    this.authService.signup(this.username, this.email, this.password).subscribe({
      next: (response) => {
        this.messageService.add({ severity: "success", summary: "Success", detail: "Account Created!" });
        this.router.navigate(["/auth/login"]);
      },
      error: (error) => {
        this.messageService.add({ severity: "error", summary: "Error", detail: "Couldn't create account!" });
      },
    });
  }
  goToLogin() {
    this.router.navigate(["/auth/login"]);
  }
}
