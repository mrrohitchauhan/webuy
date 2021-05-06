import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'webuy',
    loadChildren: () => import('./user-layout/user-layout.module').then(module => module.UserLayoutModule)
  },
  {
    path: '',
    redirectTo: 'webuy',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
