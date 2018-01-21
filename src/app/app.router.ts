import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RoutineComponent } from './components/routine/routine.component';
import { PracticeComponent } from './components/practice/practice.component';
import { AuthGuard } from './guards/auth/auth.guard';

const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'routine', component: RoutineComponent, canActivate: [AuthGuard] },
    { path: 'practice', component: PracticeComponent, canActivate: [AuthGuard] },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
