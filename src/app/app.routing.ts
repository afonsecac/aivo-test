import {Route} from '@angular/router';

import {AuthGuard as Auth0Guard} from '@auth0/auth0-angular';

import {LayoutComponent} from 'app/layout/layout.component';
import {InitialDataResolver} from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch: 'full', redirectTo: 'movies'},
    {path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'movies'},
    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'home',
                loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)
            },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [Auth0Guard],
        canActivateChild: [Auth0Guard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'example',
                loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)
            },
            {
                path: 'movies',
                loadChildren: () => import('app/modules/admin/movies/movie.module').then(m => m.MovieModule)
            }
        ]
    }
];
