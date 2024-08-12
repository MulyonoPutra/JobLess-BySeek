/* eslint-disable @typescript-eslint/no-explicit-any */
import * as LicenseActions from '../actions/license.action';

import { createReducer, on } from '@ngrx/store';

import { License } from '../../domain/entities/license';

export interface LicenseState {
    licenses: License[];
    loading: boolean;
    error: string;
}

export const initialState: LicenseState = {
    licenses: [],
    loading: false,
    error: '',
};

export const licenseReducer = createReducer(
    initialState,

    on(LicenseActions.loadLicense, (state: any) => ({ ...state, loading: true })),

    on(LicenseActions.loadLicenseSuccess, (state: any, { license }: any) => ({
        ...state,
        license,
        loading: false,
    })),

    on(LicenseActions.loadLicenseFailure, (state: any, { error }: any) => ({
        ...state,
        error,
        loading: false,
    })),

    on(LicenseActions.addLicense, (state, { licenses }) => ({
        ...state,
        licenses: [...state.licenses, ...licenses],
    })),
);
