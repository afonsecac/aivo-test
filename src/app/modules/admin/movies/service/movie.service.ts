import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject, Observable, tap} from 'rxjs';

import {apiUri} from '../../../../../../apiUri';

@Injectable({
    providedIn: 'root'
})
export class MovieService {

    private _movie: BehaviorSubject<any> = new BehaviorSubject(null);
    private _movies: BehaviorSubject<any[] | null> = new BehaviorSubject(null);

    constructor(
        private _http: HttpClient
    ) {
    }

    getMovies(): Observable<any> {
        return this._http.get('/assets/movies.json')
            .pipe(
                tap((response: any) => {
                    console.log(response);
                    // this._movies.next(response?.entries);
                })
            );
    }

    get movies$(): Observable<any[]> {
        return this._movies.asObservable();
    }
}
