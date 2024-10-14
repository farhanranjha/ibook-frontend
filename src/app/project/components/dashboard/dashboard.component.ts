import { Component, OnInit } from "@angular/core";
import { TableModule } from "primeng/table";
import { ProjectService } from "../../services/project.service";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [TableModule, ToastModule, ButtonModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
  providers: [MessageService],
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private projectServices: ProjectService,
    private messageService: MessageService
  ) {}

  projects!: any[];

  ngOnInit(): void {
    this.projectServices.getProjects().subscribe({
      next: (response) => {
        this.projects = response;
      },
      error: (error) => {
        this.messageService.add({ severity: "error", summary: "Error", detail: "Error" });
      },
    });
  }
  createDocument() {
    this.router.navigateByUrl("/editor");
  }
}
