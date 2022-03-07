import { NgModule, Optional, SkipSelf } from '@angular/core';

import { AuthModule as Auth0Module } from '@auth0/auth0-angular';

import { AuthModule } from 'app/core/auth/auth.module';
import { IconsModule } from 'app/core/icons/icons.module';
import { TranslocoCoreModule } from 'app/core/transloco/transloco.module';
import { environment } from '../../environments/environment';

@NgModule({
    imports: [
        AuthModule,
        IconsModule,
        TranslocoCoreModule,
        Auth0Module.forRoot({
            ...environment.auth,
            httpInterceptor: {
                ...environment.httpInterceptor
            }
        })
    ]
})
export class CoreModule
{
    /**
     * Constructor
     */
    constructor(
        @Optional() @SkipSelf() parentModule?: CoreModule
    )
    {
        // Do not allow multiple injections
        if ( parentModule )
        {
            throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
        }
    }
}
