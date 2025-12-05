type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

let accessToken: string | null = null;
let refreshToken: string | null = null;

export function setTokens(tokens: { access: string; refresh: string }) {
    accessToken = tokens.access;
    refreshToken = tokens.refresh;
}

function getBaseUrl() {
    return process.env.NEXT_PUBLIC_API_URL || "";
}

async function request(
    method: HttpMethod,
    url: string,
    data?: any,
    params?: any,
    retryCount = 0
) {
    const BASE_URL = getBaseUrl();

    const queryString = params
        ? "?" + new URLSearchParams(params).toString()
        : "";

    const headers: any = {
        "Content-Type": "application/json",
    };

    // 🔥 Inject JWT token automatically
    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const res = await fetch(BASE_URL + url + queryString, {
        method,
        headers,
        body: method == "GET" ? undefined : JSON.stringify(data),
    });

    // ---------- 🔥 Auto refresh token logic ----------
    if (res.status === 401 && refreshToken && retryCount === 0) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
            return request(method, url, data, params, 1);
        }
    }

    // ---------- ❗ Global error handling ----------
    if (!res.ok) {
        let message = `API Error: ${res.status}`;
        try {
            const err = await res.json();
            message = err.message || message;
        } catch(err) {
            // ignore
            console.error(err);
        }

        throw new Error(message);
    }

    return res.json();
}

// ----------- 🔥 Refresh access token -----------

async function refreshAccessToken(): Promise<boolean> {
    try {
        const BASE_URL = getBaseUrl();

        const res = await fetch(BASE_URL + "/auth/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        if (!res.ok) return false;

        const data = await res.json();

        accessToken = data.accessToken;
        refreshToken = data.refreshToken ?? refreshToken;

        return true;
    } catch {
        return false;
    }
}

// ----------- Export public API methods -----------

export const api = {
    get: (url: string, params?: any) => request("GET", url, null, params),
    post: (url: string, data?: any, params?: any) => request("POST", url, data, params),
    put: (url: string, data?: any, params?: any) => request("PUT", url, data, params),
    del: (url: string, params?: any) => request("DELETE", url, null, params),
    setTokens,
};
