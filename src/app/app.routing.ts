import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AuthorComponent } from './author/author.component';
// import { AuthorListComponent } from './author/author-list.component';
// import { AuthorSingleComponent } from './author/author-single.component';
// import { AuthorEditComponent } from './author/author-edit.component';
// import { AuthorCreateComponent } from './author/author-create.component';

import { PageNotFoundComponent } from './utils/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard }      from './shared/guards/auth-guard.service';


export const routes: Routes = [

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'author',
    loadChildren: './author/author.module#AuthorModule',
    data: {preload: true}
  },
  // {
  //   path: 'author',
  // //  canActivate: [AuthGuard],
  //   component: AuthorComponent,
  //   children: [
  //     {
  //       path: '',
  //       canActivateChild: [AuthGuard],
  //       children: [
  //         {
  //           path: '',
  //           component: AuthorListComponent
  //         },
  //         {
  //           path: 'create',
  //           component: AuthorCreateComponent
  //         },
  //         {
  //           path: ':id',
  //           component: AuthorSingleComponent
  //         },
  //         {
  //           path: ':id/edit',
  //           component: AuthorEditComponent
  //         }
  //       ]
  //     },
  //
  //   ]
  // },
  { path: '**', component: PageNotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
