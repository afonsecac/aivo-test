import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {BehaviorSubject, Subject, takeUntil} from 'rxjs';
import {MovieService} from '../../service/movie.service';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class MoviesComponent implements OnInit, OnDestroy {

    movies: any[];
    filteredMovies: any[];

    filters: {
        query$: BehaviorSubject<string>;
    } = {
        query$: new BehaviorSubject(''),
    };

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _movieService: MovieService
    ) {
    }

    ngOnInit(): void {

        this._movieService.movies$
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe((movies) => {
                this.movies = this.filteredMovies = movies;
                this._changeDetectorRef.markForCheck();
            });

        this.filters.query$.subscribe((query) => {

            this.filteredMovies = this.movies;

            if (query !== '') {
                this.filteredMovies = this.filteredMovies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase())
                    || movie.description.toLowerCase().includes(query.toLowerCase())
                    || movie.category.toLowerCase().includes(query.toLowerCase()));
            }
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    filterByQuery(query: string): void {
        this.filters.query$.next(query);
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
