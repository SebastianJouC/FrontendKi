import { Routes } from '@angular/router'
import { CookiesBannerComponent } from './components/cookies-banner/cookies-banner.component'
import { CookiesPoliticsComponent } from './components/cookies-politics/cookies-politics.component'
import { PoliticsListComponent } from './components/politics-list/politics-list.component'
import { PoliticsFormComponent } from './components/politics-form/politics-form.component'
import { CookiesEditListComponent } from './components/cookies-edit-list/cookies-edit-list.component'
import { CookiesFormComponent } from './components/cookies-form/cookies-form.component'

export const COOKIES_ROUTES: Routes = [
    {
        path: 'cookies-politics', component: CookiesPoliticsComponent
    },
]
