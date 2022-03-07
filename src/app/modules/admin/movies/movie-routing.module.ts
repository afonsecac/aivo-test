import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MovieComponent} from './component';
import {MoviesComponent} from './pages';
import {MoviesResolver} from './service/movies.resolver';

const routes: Routes = [
    {
        path: '',
        component: MovieComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: MoviesComponent,
                resolve: {
                    movies: MoviesResolver
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MovieRoutingModule {
}
