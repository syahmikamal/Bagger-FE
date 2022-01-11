import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewListPostComponent } from './view-list-post/view-list-post.component';

const routes: Routes = [
  {
    path: '',

    children: [
      {
        path: 'view-list-post',
        component: ViewListPostComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatorRoutingModule { }
