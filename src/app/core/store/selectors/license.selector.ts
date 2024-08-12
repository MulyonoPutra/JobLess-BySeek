import { AppState } from '../store';
import { LicenseState } from '../reducers/license.reducer';
import { createSelector } from '@ngrx/store';

const feature = (state: AppState) => state.license;

export const licenseSelector = createSelector(feature, (state: LicenseState) => state.licenses);
