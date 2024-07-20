import { Injectable } from '@angular/core';

export enum AuthKey {
    AccessToken = 'ACCESS_TOKEN',
    RefreshToken = 'REFRESH_TOKEN',
    Role = 'ROLE',
    UserId = 'USER_ID',
    SeekerId = 'SEEKER_ID',
    CompanyId = 'COMPANY_ID',
    Username = 'USERNAME',
}

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    protected token!: string | null;
    protected role!: string | null;
    protected seekerId!: string | null;
    protected companyId!: string | null;
    protected accessToken: string | null = null;
    protected refreshToken: string | null = null;

    public setAccessToken(token: string): void {
        sessionStorage.removeItem(AuthKey.AccessToken);
        if (token) {
            sessionStorage.setItem(AuthKey.AccessToken, token);
        }
    }

    public getAccessToken(): string {
        return sessionStorage.getItem(AuthKey.AccessToken)!;
    }

    public setRefreshToken(token: string): void {
        this.refreshToken = token;
        sessionStorage.removeItem(AuthKey.RefreshToken);
        sessionStorage.setItem(AuthKey.RefreshToken, token);
    }

    public getRefreshToken(): string {
        return sessionStorage.getItem(AuthKey.RefreshToken)!;
    }

    public removeRefreshToken(): void {
        sessionStorage.removeItem(AuthKey.RefreshToken);
    }

    public isAuthenticate(): boolean {
        if (this.getAccessToken() == null) {
            return false;
        }

        return true;
    }

    isLoggedIn(): boolean {
        const authToken = sessionStorage.getItem(AuthKey.AccessToken);
        return !!authToken;
    }

    public setRole(role: string): void {
        this.role = role;
        sessionStorage.removeItem(AuthKey.Role);
        sessionStorage.setItem(AuthKey.Role, role);
    }

    public getRole(): string {
        return sessionStorage.getItem(AuthKey.Role)!;
    }

    public getUserIdentity(): string {
        return sessionStorage.getItem(AuthKey.UserId)!;
    }

    public setSeekerIdentity(id: string): void {
        this.seekerId = id;
        sessionStorage.removeItem(AuthKey.SeekerId);
        sessionStorage.setItem(AuthKey.SeekerId, id);
    }

    public getSeekerIdentity(): string {
        return sessionStorage.getItem(AuthKey.SeekerId)!;
    }

    public setCompanyIdentity(id: string): void {
        this.companyId = id;
        sessionStorage.removeItem(AuthKey.CompanyId);
        sessionStorage.setItem(AuthKey.CompanyId, id);
    }

    public getCompanyIdentity(): string {
        return sessionStorage.getItem(AuthKey.CompanyId)!;
    }

    public clear() {
        this.token = null;
        sessionStorage.clear();
    }
}
