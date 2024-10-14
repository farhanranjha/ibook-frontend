import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EditorComponent } from "./components/editor/editor.component";

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "editor", component: EditorComponent },
  { path: "**", redirectTo: "/dashboard" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
