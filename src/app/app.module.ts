import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AngularCropperjsModule } from 'angular-cropperjs';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './components/modal/modal.component';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  imports: [NgxSpinnerModule,BrowserModule, FormsModule, AngularCropperjsModule, NgbModule, HttpClientModule, FontAwesomeModule],
  declarations: [AppComponent, HeaderComponent, ModalComponent],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
