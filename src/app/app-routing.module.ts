import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Http401Component } from 'src/assets/httpRequests/http401/http401.component';
import { LoginWebComponent } from './components/forms/login-web/login-web.component';
import { Params001Component } from './components/forms/params001/params001.component';
import { Params002Component } from './components/forms/params002/params002.component';
import { AuthGuard } from './Guards/AuthGuard';
import { Params003Component } from './Modules/Institucionales/Components/params003/params003.component';
import { Params004Component } from './Modules/Institucionales/Components/params004/params004.component';
import { Params005Component } from './Modules/Institucionales/Components/Params005/Params005.component';
import { Params006Component } from './Modules/Institucionales/Components/Params006/Params006.component';
import { OperationsParam001Component } from './Modules/Operaciones/Components/OperationsParam001/OperationsParam001.component';

const routes: Routes = [
  { path: '', redirectTo: 'http401', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  { path: 'param001', component: Params001Component },
  { path: 'param002', component: Params002Component },
  { path: 'login-web/:username/:password', component: LoginWebComponent },
  { path: 'param003/:username/:password', component: Params003Component, canActivate: [AuthGuard] },
  { path: 'param004/:username/:password', component: Params004Component, canActivate: [AuthGuard] },
  { path: 'param005/:username/:password', component: Params005Component, canActivate: [AuthGuard] },
  { path: 'param006/:username/:password', component: Params006Component, canActivate: [AuthGuard] },
  { path: 'http401', component:Http401Component},
  // { path: 'operationsParam001/:username/:password',component:OperationsParam001Component }
  { path: 'operationsParam001/:validate/:empresa/:agencia/:autorizacion',component:OperationsParam001Component, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
