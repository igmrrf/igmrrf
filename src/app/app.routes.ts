import { Routes } from '@angular/router'
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component'
import { BannerComponent } from './banner/banner.component'

export const routes: Routes = [
    {
        title: 'Igmrrf',
        path: '',
        component: BannerComponent,
    },
    {
        title: 'Privacy Policy',
        path: 'muzic/privacy-policy',
        component: PrivacyPolicyComponent,
    },
]
