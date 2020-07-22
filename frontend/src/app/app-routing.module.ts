import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { MasterLayoutComponent } from './layouts/master-layout/master-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MasterLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './components/auth/auth.module#AuthModule',
      },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [NoAuthGuard],
    children: [
      {
        path: '',
        loadChildren: './components/non-auth/non-auth.module#NonAuthModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
