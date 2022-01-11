import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewListPostComponent } from './view-list-post/view-list-post.component';

import { CreatorRoutingModule } from './creator-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CreatorRoutingModule,
    ViewListPostComponent
  ]
})
export class CreatorModule { }
