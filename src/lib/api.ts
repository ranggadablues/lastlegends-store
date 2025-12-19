type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
};

let accessToken: string | null = null;
let refreshToken: string | null = null;

export function setTokens(tokens: { access: string; refresh: string }) {
    accessToken = tokens.access;
    refreshToken = tokens.refresh;
}

function getBaseUrl() {
    if (typeof window === "undefined") {
        // Server-side (Docker → Docker)
        return process.env.API_INTERNAL_URL || "";
    }

    // Client-side (Browser → Gateway)
    return process.env.NEXT_PUBLIC_API_URL || "";
}

async function request<TResponse, TBody = unknown>(
    method: HttpMethod,
    url: string,
    data?: TBody,
    params?: Record<string, string>,
    retryCount = 0
): Promise<TResponse> {
    const BASE_URL = getBaseUrl();

    const queryString = params
        ? "?" + new URLSearchParams(params).toString()
        : "";

    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    // 🔥 Inject JWT token automatically
    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const res = await fetch(BASE_URL + url + queryString, {
        method,
        headers,
        body: method == "GET" || data === undefined ? undefined : JSON.stringify(data),
    });

    // ---------- 🔥 Auto refresh token logic ----------
    if (res.status === 401 && refreshToken && retryCount === 0) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
            return request<TResponse, TBody>(method, url, data, params, 1);
        }
    }

    // ---------- ❗ Global error handling ----------
    if (!res.ok) {
        let message = `API Error: ${res.status}`;
        try {
            const err: { message?: string } = await res.json();
            message = err.message ?? message;
        } catch (err) {
            // ignore
            console.error(err);
        }

        throw new Error(message);
    }

    return res.json();
}

// ----------- 🔥 Refresh access token -----------

type RefreshTokenResponse = {
    accessToken: string;
    refreshToken?: string;
};

async function refreshAccessToken(): Promise<boolean> {
    try {
        const BASE_URL = getBaseUrl();

        const res = await fetch(BASE_URL + "/auth/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        if (!res.ok) return false;

        const data: RefreshTokenResponse = await res.json();

        accessToken = data.accessToken;
        refreshToken = data.refreshToken ?? refreshToken;

        return true;
    } catch {
        return false;
    }
}

// ----------- Export public API methods -----------

export const api = {
    // get: (url: string, params?: any) => request("GET", url, null, params),
    // post: (url: string, data?: any, params?: any) => request("POST", url, data, params),
    // put: (url: string, data?: any, params?: any) => request("PUT", url, data, params),
    // del: (url: string, params?: any) => request("DELETE", url, null, params),
    get<TResponse>(url: string, params?: Record<string, string>) {
        return request<TResponse>("GET", url, undefined, params);
    },

    post<TResponse, TBody = unknown>(
        url: string,
        data?: TBody,
        params?: Record<string, string>
    ) {
        return request<TResponse, TBody>("POST", url, data, params);
    },

    put<TResponse, TBody = unknown>(
        url: string,
        data?: TBody,
        params?: Record<string, string>
    ) {
        return request<TResponse, TBody>("PUT", url, data, params);
    },

    del<TResponse>(url: string, params?: Record<string, string>) {
        return request<TResponse>("DELETE", url, undefined, params);
    },
    setTokens,
};
