import { Routes } from '@angular/router'
import { UserComponent } from './user.component'
import { RegistrationComponent } from './registration/registration.component'
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from '../dashboard/dashboard.component'
import { authGuard } from '../guarded/auth.guard'
import { UserManagerComponent } from '../adminOnly/user-manager/user-manager.component'
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component'
import { ClientListComponent } from '../client/client-list/client-list.component'
import { ForbiddenComponent } from '../forbidden/forbidden.component'
import { claimReq } from '../utils/claimReq-utils'
import { CookiesBannerComponent } from '../cookies/components/cookies-banner/cookies-banner.component'
import { CookiesPoliticsComponent } from '../cookies/components/cookies-politics/cookies-politics.component'
import { PoliticsListComponent } from '../cookies/components/politics-list/politics-list.component'
import { PoliticsFormComponent } from '../cookies/components/politics-form/politics-form.component'
import { CookiesEditListComponent } from '../cookies/components/cookies-edit-list/cookies-edit-list.component'
import { CookiesFormComponent } from '../cookies/components/cookies-form/cookies-form.component'
import { UserCookiesManagerComponent } from '../adminOnly/user-cookies-manager/user-cookies-manager.component'
import { noAuthGuardGuard } from '../guarded/no-auth-guard.guard'

export const USER_ROUTES: Routes = [
    {
        path: 'user', component: UserComponent,
        canActivate: [noAuthGuardGuard],
        children: [
        {
            path: '', redirectTo: 'login', pathMatch: 'full'
        },            
        {
            path: 'registration', component: RegistrationComponent
        },
        {
            path: 'login', component: LoginComponent
        }]
    },
    {
        path:'layout', component: MainLayoutComponent, canActivate: [authGuard],
        canActivateChild: [authGuard],
        children: [
            {
                path: '', redirectTo: 'dashboard', pathMatch: 'full'
            },  
            {
                path: 'dashboard', component: DashboardComponent
            },
            {
                path: 'AdminOnly', component: UserManagerComponent,
                data: {claimReq: claimReq.adminOnly}
            },
            {
                path: 'Clients', component: ClientListComponent,
                data: {claimReq: claimReq.adminOrClient}
            },
            {
                path: 'forbidden', component: ForbiddenComponent
            },
            {
                path: 'politics-edit', component: PoliticsListComponent,
                data: {claimReq: claimReq.adminOnly}
            },
            {
                path: 'new', component: PoliticsFormComponent,
                data: {claimReq: claimReq.adminOnly}
            },
            {
                path: 'edit/:id', component: PoliticsFormComponent,
                data: {claimReq: claimReq.adminOnly}
            },
            {
                path: 'cookies-edit', component: CookiesEditListComponent,
                data: {claimReq: claimReq.adminOnly}
            },
            {
                path: 'newCookie', component: CookiesFormComponent,
                data: {claimReq: claimReq.adminOnly}
            },
            {
                path: 'editCookie/:id', component: CookiesFormComponent,
                data: {claimReq: claimReq.adminOnly}
            },
            {
                path: 'cookies-user', component: UserCookiesManagerComponent,
                data: {claimReq: claimReq.adminOnly}
            }
        ]
    }
]