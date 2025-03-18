import { Routes } from '@angular/router';

export const rechargesRoutes: Routes = [
    {
        path: '',
        redirectTo: 'all-recharges',
        pathMatch: 'full'
    },
    {
        path: 'all-recharges',
        loadComponent: () => import('../../features/recharges/pages/all-recharges/all-recharges.component')
            .then(c => c.AllRechargesComponent)
    },
    {
        path: 'buy',
        loadComponent: () => import('../../features/recharges/pages/create-recharge/create-recharge.component')
            .then(c => c.CreateRechargeComponent) 
    },
]