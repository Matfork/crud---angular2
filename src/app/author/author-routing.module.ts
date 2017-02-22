import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorComponent } from './author.component';
import { AuthorListComponent } from './author-list.component';
import { AuthorSingleComponent } from './author-single.component';
import { AuthorEditComponent } from './author-edit.component';
import { AuthorCreateComponent } from './author-create.component';

import { AuthGuard } from '../shared/guards/auth-guard.service';

const authorRoutes: Routes = [
  {
    path: 'author',
  //  canActivate: [AuthGuard],
    component: AuthorComponent,
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: AuthorListComponent
          },
          {
            path: 'create',
            component: AuthorCreateComponent
          },
          {
            path: ':id',
            component: AuthorSingleComponent
          },
          {
            path: ':id/edit',
            component: AuthorEditComponent
          }
        ]
      },

    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(authorRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthorRoutingModule { }
