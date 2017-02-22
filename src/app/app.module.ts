import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http} from '@angular/http';
import { routing } from './app.routing';

import { AppComponent } from './app.component';

// import { AuthorComponent } from './author/author.component';
// import { AuthorEditComponent } from './author/author-edit.component';
// import { AuthorListComponent } from './author/author-list.component';
// import { AuthorCreateComponent } from './author/author-create.component';
// import { AuthorSingleComponent } from './author/author-single.component';
import { AuthorModule } from './author/author.module';

// import { BookComponent } from './book/book.component';
// import { BookEditComponent } from './book/edit.component';
// import { BookListComponent } from './book/list.component';
// import { BookCreateComponent } from './book/create.component';
// import { BookSingleComponent } from './book/single.component';
import { BookModule } from './book/book.module';

import { PageNotFoundComponent } from './utils/page-not-found.component';

import { LoginComponent } from './login/login.component';

import { AuthorService } from './shared/services/author.service';
import { BookService } from './shared/services/book.service';
import { AuthService } from './shared/services/auth.service';

import { AuthGuard } from './shared/guards/auth-guard.service';

import { InterceptorService } from 'ng2-interceptors';
import { XHRBackend, RequestOptions } from '@angular/http';
import { interceptorFactory} from './shared/interceptor/interceptor.factory';
import { ServerURLInterceptor} from './shared/interceptor/server-url.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

@NgModule({
  declarations: [
    AppComponent,
    // AuthorComponent,
    // AuthorEditComponent,
    // AuthorListComponent,
    // AuthorCreateComponent,
    // AuthorSingleComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    AuthorModule,
    BookModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AuthService,
    // AuthorService,    
    AuthGuard,
    ServerURLInterceptor, // Add it here
    {
      provide: InterceptorService,
      useFactory: interceptorFactory,
      deps: [XHRBackend, RequestOptions, ServerURLInterceptor]
    }
    // To completely replace Http calls for our interceptor uncomment following part
    // ,{
    //   provide: Http,
    //   useFactory: interceptorFactory,
    //   deps: [XHRBackend, RequestOptions]
    // }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
