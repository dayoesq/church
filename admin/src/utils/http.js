export class Http {
    static #abortCtr = new AbortController();
    static async get(uri, headers, request) {
        try {
            const res = await fetch(`${uri}`, {
                method: 'GET',
                headers,
                signal: request.signal
            });
            if (!res.ok) throw res;
            const data = await res.json();
            return data;
        } catch (error) {
            return error;
        }
    }

    static async delete(uri, headers, request) {
        try {
            const res = await fetch(`${uri}`, {
                method: 'DELETE',
                headers,
                signal: request.signal
            });
            if (!res.ok) throw res;
            const data = await res.json();
            return data;
        } catch (error) {
            return error;
        }
    }

    static async post(uri, headers, request, options) {
        const inputs = await Http.fromEntries(request, {
            isFormData: options.isFormData
        });
        try {
            const res = await fetch(`${uri}`, {
                method: 'POST',
                headers,
                body: inputs,
                signal: request.signal
            });
            if (!res.ok) throw res;
            const data = await res.json();
            return data;
        } catch (error) {
            return error;
        }
    }

    static async patch(uri, headers, request, options) {
        const inputs = await Http.fromEntries(request, {
            isFormData: options.isFormData
        });
        try {
            const res = await fetch(`${uri}`, {
                method: 'PATCH',
                headers,
                body: inputs,
                signal: request.signal
            });
            if (!res.ok) throw res;
            const data = await res.json();
            return data;
        } catch (error) {
            return error;
        }
    }

    static async fromEntries(request, options) {
        const formData = await request.formData();
        const entries = Object.fromEntries(formData);
        return options.isFormData ? formData : JSON.stringify(entries);
    }

    // General Option
    static async getRequest(uri, headers) {
        try {
            const res = await fetch(`${uri}`, {
                method: 'GET',
                headers,
                signal: Http.#abortCtr.signal
            });
            if (!res.ok) throw res;
            const data = await res.json();
            return data;
        } catch (error) {
            return error;
        }
    }

    static async patchRequest(uri, headers, options) {
        try {
            const res = await fetch(`${uri}`, {
                method: 'PATCH',
                headers,
                body: options.body,
                signal: Http.#abortCtr.signal
            });
            if (!res.ok) throw res;
            const data = await res.json();
            return data;
        } catch (error) {
            return error;
        }
    }

    static async postRequest(uri, headers, options) {
        const body = options;
        try {
            const res = await fetch(`${uri}`, {
                method: 'POST',
                headers,
                body,
                signal: Http.#abortCtr.signal
            });
            if (!res.ok) throw res;
            const data = await res.json();
            return data;
        } catch (error) {
            return error;
        }
    }
    static async deleteRequest(uri, headers) {
        try {
            const res = await fetch(`${uri}`, {
                method: 'DELETE',
                headers,
                signal: Http.#abortCtr.signal
            });
            if (!res.ok) throw res;
            const data = await res.json();
            return data;
        } catch (error) {
            return error;
        }
    }
}
