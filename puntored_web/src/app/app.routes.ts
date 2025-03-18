import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'recharges',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('../app/features/auth/auth.routes').then(m => m.authRoutes),
        loadComponent: () => import('./features/auth/layout/layout.component').then((c)=>c.LayoutComponent),
        
    },

    {
        path: 'recharges',
        loadComponent: () => import('../app/shared/components/main-layout/main-layout.component')
            .then(c => c.MainLayoutComponent),
        loadChildren: () => import('../app/features/recharges/recharges.routes')
            .then(m => m.rechargesRoutes),
        canActivate: [authGuard]
    },
];
