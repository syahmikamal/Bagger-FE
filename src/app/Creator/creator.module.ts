import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewListPostComponent } from './view-list-post/view-list-post.component';

import { CreatorRoutingModule } from './creator-routing.module';
import { ViewPostComponent } from './view-post/view-post.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CreatorRoutingModule,
    ViewListPostComponent,
    ViewPostComponent
  ]
})
export class CreatorModule { }
