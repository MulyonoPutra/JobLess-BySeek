import { createAction, props } from '@ngrx/store';

import { License } from '../../domain/entities/license';

export const loadLicense = createAction('[License] Load License');
export const loadLicenseSuccess = createAction(
    '[License] Load License Success',
    props<{ licenses: License[] }>(),
);
export const loadLicenseFailure = createAction(
    '[License] Load License Failure',
    props<{ error: string }>(),
);
export const addLicense = createAction(
    '[License] Add License',
    props<{ seekerId: string; licenses: License[] }>(),
);
export const deleteLicense = createAction('[License] Delete License', props<{ id: string }>());

export const loadSeeker = createAction('[Seeker] Load Seeker', props<{ id: string }>());
