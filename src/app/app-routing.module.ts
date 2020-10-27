import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivarCuentaComponent } from './activar-cuenta/activar-cuenta.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "activar-cuenta", component: ActivarCuentaComponent },
  { path: "reset-pass", component: ResetPassComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
