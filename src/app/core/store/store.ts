import { Action, ActionReducer } from '@ngrx/store';

import { LicenseEffects } from './effects/license.effect';
import { LicenseState } from './reducers/license.reducer';
import { licenseReducer } from './reducers/license.reducer';

export interface AppState {
    license: LicenseState;
}

export interface AppStore {
    license: ActionReducer<LicenseState, Action>;
}

export const appStore: AppStore = {
    license: licenseReducer,
};

export const appEffects = [LicenseEffects];
