import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { AuthorComponent } from './author/author.component';
import { AuthorEditComponent } from './author/author-edit.component';
import { AuthorListComponent } from './author/author-list.component';
import { AuthorCreateComponent } from './author/author-create.component';
import { AuthorSingleComponent } from './author/author-single.component';
import { LoginComponent } from './login/login.component';

import { AuthorService } from './shared/services/author.service';
import { BookService } from './shared/services/book.service';
import { AuthService } from './shared/services/auth.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    AuthorEditComponent,
    AuthorListComponent,
    AuthorCreateComponent,
    AuthorSingleComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AuthService,
    AuthorService,
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
