import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { EditorModule } from "primeng/editor";
import { InputTextModule } from "primeng/inputtext";
import { ProjectService } from "../../services/project.service";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { Router } from "@angular/router";

@Component({
  selector: "app-editor",
  standalone: true,
  imports: [EditorModule, FormsModule, ButtonModule, InputTextModule, ToastModule],
  templateUrl: "./editor.component.html",
  styleUrl: "./editor.component.scss",
  providers: [MessageService],
})
export class EditorComponent {
  constructor(private router: Router, private projectService: ProjectService, private messageService: MessageService) {}

  text: string = "";
  title: string = "";
  createDocument() {
    this.projectService.createProject(this.title, this.text).subscribe({
      next: () => {
        this.messageService.add({ severity: "success", summary: "Success", detail: "Document saved!" });
      },
      error: (err) => {
        this.messageService.add({ severity: "error", summary: "Error", detail: "Failed to save document!" });
      },
    });
  }
  goToDashboard() {
    this.router.navigateByUrl("/dashboard");
  }
}
