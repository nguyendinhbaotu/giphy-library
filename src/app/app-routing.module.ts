import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrendingComponent, SearchComponent, FavoriteComponent, HomeComponent } from './pages';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'trending', component: TrendingComponent },
  { path: 'favorite', component: FavoriteComponent },
  { path: '', redirectTo: '/trending', pathMatch: 'full' }, // redirect to `first-component`
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
