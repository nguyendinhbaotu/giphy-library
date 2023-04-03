import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloComponent, SearchComponent } from './components/';

const routes: Routes = [
  { path: 'hello', component: HelloComponent },
  { path: 'search', component: SearchComponent },
  // { path: 'second-component', component: SecondComponent },
  { path: '', redirectTo: '/hello', pathMatch: 'full' }, // redirect to `first-component`
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
