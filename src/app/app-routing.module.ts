import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { ForumModule } from './forum/forum.module';

const routes: Route[] = [
  {path:'login', loadChildren: () => AuthModule},
  {path:'', loadChildren: () => ForumModule},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
