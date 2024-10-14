import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { EditorModule } from "primeng/editor";
import { InputTextModule } from "primeng/inputtext";
import { ProjectService } from "../../services/project.service";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { Router } from "@angular/router";
import { SidebarModule } from "primeng/sidebar";
import Quill from "quill";
import { CommonModule } from "@angular/common";
import { DialogModule } from "primeng/dialog";

@Component({
  selector: "app-editor",
  standalone: true,
  imports: [
    EditorModule,
    DialogModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    SidebarModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.scss"],
  providers: [MessageService],
})
export class EditorComponent {
  @ViewChild("editor") editor: any;

  text: string = "";
  title: string = "";
  selectedWord: string = "";
  wordMeaning: any;
  sidebarVisible: boolean = false;
  modalVisible: boolean = false;
  friendForm!: FormGroup;

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private projectService: ProjectService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.friendForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      address: ["", Validators.required],
      city: ["", Validators.required],
      postalCode: ["", Validators.required],
    });
  }

  findMeaning() {
    console.log("===this.selectedWord===> ", this.selectedWord);

    this.projectService.getSynonyms(this.selectedWord).subscribe({
      next: (value) => {
        this.wordMeaning = value;
        this.sidebarVisible = true;
        this.cd.detectChanges();
      },
    });
  }

  onEditorInit(event: any) {
    const quillEditor: Quill = event.editor;
    const editorElement = quillEditor.root;

    editorElement.addEventListener("dblclick", (event: MouseEvent) => {
      const selection = quillEditor.getSelection();
      if (selection && selection.length > 0) {
        const selectedText = quillEditor.getText(selection.index, selection.length);
        this.selectedWord = selectedText;
        this.findMeaning();
        this.cd.detectChanges();
      }
    });
  }

  createDocument() {
    this.projectService.createProject(this.title, this.text).subscribe({
      next: () => {
        this.modalVisible = true;
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

  onSubmit(): void {
    if (this.friendForm.valid) {
      this.modalVisible = false;
      console.log("Form Submitted", this.friendForm.value);
    } else {
      console.log("Form is invalid");
    }
  }
}
