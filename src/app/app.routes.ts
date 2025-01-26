import { Routes } from '@angular/router';
import { COOKIES_ROUTES } from './cookies/cookies.routes';

export const APP_ROUTES: Routes = [
    {
        path: '', redirectTo: '', pathMatch: 'full'
    },
    {
        path: 'cookies', children: COOKIES_ROUTES
    }
];
