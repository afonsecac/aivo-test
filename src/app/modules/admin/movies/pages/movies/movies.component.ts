import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';

import {BehaviorSubject, combineLatest, Subject, takeUntil} from 'rxjs';

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
    categories: string[] = ['movie', 'series'];
    ascOrDesc: boolean = true;
    sortKey: string = 'title';

    filters: {
        query$: BehaviorSubject<string>;
        category$: BehaviorSubject<string>;
    } = {
        query$: new BehaviorSubject(''),
        category$: new BehaviorSubject('all'),
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
                this.sortBy();
                this._changeDetectorRef.markForCheck();
            });

        combineLatest(
            [
                this.filters.query$,
                this.filters.category$
            ]
        )
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe(([query, category]) => {
                this.filteredMovies = this.movies;

                if (query?.length > 0) {
                    const queryLower = query.toLowerCase();
                    this.filteredMovies = this.filteredMovies?.filter(
                        (movie: any) => movie.title.toString().toLowerCase().indexOf(queryLower) >= 0 ||
                            movie.description.toString().toLowerCase().indexOf(queryLower) >= 0 ||
                            movie.releaseYear.toString().includes(queryLower)
                    );
                }

                if (category !== 'all') {
                    this.filteredMovies = this.filteredMovies.filter(movie => movie.programType === category);
                }

                this.sortBy();

                this._changeDetectorRef.markForCheck();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    filterByCategory(change: MatSelectChange): void {
        this.filters.category$.next(change.value);
    }

    filterByQuery(query: string): void {
        this.filters.query$.next(query);
    }

    changeOrderBy(change: MatSelectChange): void {
        this.sortKey = change.value;
        this.sortBy();
    }

    sortBy(): void {
        const key = this.sortKey;
        this.filteredMovies = this.filteredMovies.sort((a: any, b: any) => {
            if (this.ascOrDesc) {
                return a[key].toString() > b[key].toString() ? 1 : b[key].toString() > a[key].toString() ? -1 : 0;
            } else {
                return a[key].toString() < b[key].toString() ? 1 : b[key].toString() < a[key].toString() ? -1 : 0;
            }
        });
    }

    trackByFn(index: number, item: any): any {
        return item.title || index;
    }
}
