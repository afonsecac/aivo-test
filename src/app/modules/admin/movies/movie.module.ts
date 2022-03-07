import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';

import {MovieRoutingModule} from './movie-routing.module';
import {MovieComponent} from './component';
import {moviesCmpDefault} from './pages';
import {SharedModule} from '../../../shared/shared.module';
import {FuseFindByKeyPipeModule} from '@fuse/pipes/find-by-key';



@NgModule({
    declarations: [
        MovieComponent,
        ...moviesCmpDefault
    ],
    imports: [
        CommonModule,
        MovieRoutingModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatTooltipModule,
        FuseFindByKeyPipeModule,
        SharedModule,
        MatTabsModule
    ]
})
export class MovieModule {
}
