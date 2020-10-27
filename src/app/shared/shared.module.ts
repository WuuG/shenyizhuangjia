import { LocalStorageService } from './services/local-storage.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { ConfirmDirective } from './directives/confirm.directive';
import { PhonFormatDirective } from './directives/phon-format.directive';



@NgModule({
  declarations: [
    CopyrightComponent,
    ConfirmDirective,
    PhonFormatDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  providers: [
    LocalStorageService
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CopyrightComponent,
    ConfirmDirective,
    PhonFormatDirective,
  ]
})
export class SharedModule { }
