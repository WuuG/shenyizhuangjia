import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefaultPageRoutingModule } from './default-routing.module';

import { DefaultPage } from './default.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefaultPageRoutingModule,
    SharedModule
  ],
  declarations: [DefaultPage]
})
export class DefaultPageModule {}
