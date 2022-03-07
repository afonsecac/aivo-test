import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {MovieService} from './movie.service';

@Injectable({
    providedIn: 'root'
})
export class MoviesResolver implements Resolve<any> {

    constructor(
        private _movieService: MovieService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this._movieService.getMovies();
    }
}
