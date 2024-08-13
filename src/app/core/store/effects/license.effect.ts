import * as LicenseAction from '../actions/license.action';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { ProfileService } from '../../../features/profiles/services/profile.service';
import { loadSeeker } from '../actions/license.action';

@Injectable()
export class LicenseEffects {
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

    findSeekerById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadSeeker),
            mergeMap((action) =>
                this.profileService.findOne(action.id).pipe(
                    map((seeker) => {
                        return LicenseAction.loadLicenseSuccess({ licenses: seeker.license });
                    }),
                    catchError((error: string) => of(LicenseAction.loadLicenseFailure({ error }))),
                ),
            ),
        ),
    );

    constructor(
        private actions$: Actions,
        private profileService: ProfileService,
    ) {}
}
