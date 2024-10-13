import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule, AppRoutingModule, BrowserModule],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
