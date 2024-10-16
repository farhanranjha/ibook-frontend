import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { LayoutComponent } from "./shared/layout/layout.component";
import { LoginComponent } from "./auth/components/login/login.component";
import { SignupComponent } from "./auth/components/signup/signup.component";
import { NotfoundComponent } from "./shared/notfound/notfound.component";
import { AuthGuard } from "./guards/auth.guard";
import { LoggedGuard } from "./guards/logged.guard";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: "",
        component: LayoutComponent,
        children: [{ path: "", loadChildren: () => import("./project/project.module").then((m) => m.ProjectModule) }],
        canActivate: [AuthGuard],
      },
      {
        path: "auth",
        loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
        // canActivate: [LoggedGuard],
      },
      { path: "notfound", component: NotfoundComponent },
      { path: "**", redirectTo: "/notfound" },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
