import { Routes } from '@angular/router'
import { UserComponent } from './user.component'
import { RegistrationComponent } from './registration/registration.component'
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from '../dashboard/dashboard.component'
import { authGuard } from '../guarded/auth.guard'

export const USER_ROUTES: Routes = [
    {
        path: 'user', component: UserComponent,
        children: [{
            path: 'registration', component: RegistrationComponent
        },
        {
            path: 'login', component: LoginComponent
        }]
    },
    {
        path: 'dashboard', component: DashboardComponent, 
        canActivate: [authGuard]
    }
   
]