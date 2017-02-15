import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorComponent } from './author/author.component';
import { AuthorListComponent } from './author/author-list.component';
import { AuthorSingleComponent } from './author/author-single.component';
import { AuthorEditComponent } from './author/author-edit.component';
import { AuthorCreateComponent } from './author/author-create.component';

import { BookComponent } from './book/book.component';
import { BookListComponent } from './book/list.component';
import { BookSingleComponent } from './book/single.component';
import { BookEditComponent } from './book/edit.component';
import { BookCreateComponent } from './book/create.component';


import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/author',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'author',
    component: AuthorComponent,
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
  {
    path: 'book',
    component: BookComponent,
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
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
