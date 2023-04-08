import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image'; // <-- include ScrollHooks
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { TrendingComponent, SearchComponent, FavoriteComponent } from './pages';
import { GifListComponent } from './components';
import { HelloComponent } from './components/hello/hello.component';
import { GiphyRepo } from './repos';
import { GiphyService } from './services';
import { LazyImgDirective } from './directives';

@NgModule({
  declarations: [
    AppComponent,
    TrendingComponent,
    GifListComponent,
    SearchComponent,
    HelloComponent,
    FavoriteComponent,
    LazyImgDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    LazyLoadImageModule,
    NgxSkeletonLoaderModule.forRoot()
  ],
  providers: [
    { provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks },
    GiphyRepo,
    GiphyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
