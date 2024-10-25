import jwtDecode, { JwtPayload } from 'jwt-decode';

export interface newJwtPayload {
    iss?: string;
    sub?: string;
    aud?: string[] | string;
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
    role?: "u" | "a"
}

export function retrieveJWT(): string | null {
    return localStorage.getItem("jwt");
}

export function storeJWT(jwt: string) {
    localStorage.setItem("jwt", jwt);
}

export function removeJWT() {
    localStorage.removeItem("jwt");
}

export function getLoginInfoFromJWT(jwt: string | null): { userId: string, role: "u" | "a" } | null {
    if (!jwt) {
        return null;
    }
    const payload: newJwtPayload = jwtDecode(jwt);
    const userId = payload.sub;
    const role: "u" | "a" | undefined = payload.role
    if (!userId || !role) {
        return null;
    }
    return { userId, role };
}

