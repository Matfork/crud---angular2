import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookComponent } from './book.component';
import { BookListComponent } from './list.component';
import { BookSingleComponent } from './single.component';
import { BookEditComponent } from './edit.component';
import { BookCreateComponent } from './create.component';

import { AuthGuard } from '../shared/guards/auth-guard.service';

const bookRoutes: Routes = [
  {
    path: 'book',
    component: BookComponent,
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: BookListComponent
          },
          {
            path: 'create',
            component: BookCreateComponent
          },
          {
            path: ':id',
            component: BookSingleComponent
          },
          {
            path: ':id/edit',
            component: BookEditComponent
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(bookRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BookRoutingModule { }
