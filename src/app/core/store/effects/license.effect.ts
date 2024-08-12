import * as LicenseAction from '../actions/license.action';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { ProfileService } from '../../../features/profiles/services/profile.service';

@Injectable()
export class LicenseEffects {
    constructor(
        private actions$: Actions,
        private profileService: ProfileService,
    ) {}

    addLicense$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(LicenseAction.addLicense),
                mergeMap((action) =>
                    action.licenses.map((license) => {
                        return this.profileService
                            .createLicense(license.seekerId!, action.licenses)
                            .pipe(
                                map((licenses) => LicenseAction.loadLicenseSuccess({ licenses })),
                                catchError((error: string) =>
                                    of(LicenseAction.loadLicenseFailure({ error })),
                                ),
                            );
                    }),
                ),
            );
        },
        { dispatch: false },
    );
}
