import { LocalStorageService } from './services/local-storage.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { ConfirmDirective } from './directives/confirm.directive';
import { PhonFormatDirective } from './directives/phon-format.directive';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


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
    LocalStorageService,
    BarcodeScanner,
    Camera,
    ImagePicker,
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
