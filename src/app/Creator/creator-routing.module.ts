import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewListPostComponent } from './view-list-post/view-list-post.component';

const routes: Routes = [
  {
    path: '',

    children: [
      {
        path: 'blog',
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
