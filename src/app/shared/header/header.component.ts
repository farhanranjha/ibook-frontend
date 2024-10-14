import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { ButtonModule } from "primeng/button";
import { remove } from "../../store/user.actions";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [ButtonModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  constructor(private store: Store, private router: Router) {}
  logout() {
    this.store.dispatch(remove());
    this.router.navigateByUrl("/auth/login");
  }
}
