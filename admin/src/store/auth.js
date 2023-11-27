import { createContext } from 'react';

export const AuthContext = createContext({
    user: {
        id: undefined,
        first_name: undefined,
        last_name: undefined,
        avatar: undefined,
        role: undefined,
        status: undefined
    },
    token: undefined,
    login: (user, token, date) => {},
    logout: () => {}
});
