import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiUri} from '../../../../../../apiUri';

@Injectable({
    providedIn: 'root'
})
export class MovieService {

    constructor(
        private _http: HttpClient
    ) {
    }

    movies$(): Observable<any> {
        return this._http.get(`${apiUri}/movies.json`);
    }
}
