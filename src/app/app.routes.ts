import { Routes } from '@angular/router';
import { COOKIES_ROUTES } from './cookies/cookies.routes';
import { USER_ROUTES } from './user/user.routes';

export const APP_ROUTES: Routes = [
    {
        path: '', redirectTo: '', pathMatch: 'full'
    },
    {
        path: 'cookies', children: COOKIES_ROUTES
    },
    {
        path:'', children: USER_ROUTES
    }
];
