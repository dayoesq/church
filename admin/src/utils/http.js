export class Http {
    static async get(uri, headers, request) {
        try {
            const res = await fetch(uri, {
                method: 'GET',
                headers,
                signal: request.signal
            });
            if (!res.ok) throw res;
            return await res.json();
        } catch (error) {
            return error;
        }
    }

    static async delete(uri, headers, request) {
        try {
            const res = await fetch(uri, {
                method: 'DELETE',
                headers,
                signal: request.signal
            });
            if (!res.ok) throw res;
            return res.ok;
        } catch (error) {
            return error;
        }
    }

    static async post(uri, headers, request, options) {
        const inputs = await Http.fromEntries(request, {
            isFormData: options.isFormData
        });
        try {
            const res = await fetch(uri, {
                method: 'POST',
                headers,
                body: inputs,
                signal: request.signal
            });
            if (!res.ok) throw res;
            return await res.json();
        } catch (error) {
            return error;
        }
    }

    static async patch(uri, headers, request, options) {
        const inputs = await Http.fromEntries(request, {
            isFormData: options.isFormData
        });
        try {
            const res = await fetch(uri, {
                method: 'PATCH',
                headers,
                body: inputs,
                signal: request.signal
            });
            if (!res.ok) throw res;
            return await res.json();
        } catch (error) {
            return error;
        }
    }

    static async fromEntries(request, options) {
        const formData = await request.formData();
        const entries = Object.fromEntries(formData);
        return options.isFormData ? formData : JSON.stringify(entries);
    }
}
