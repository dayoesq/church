import { createContext } from 'react';

export const AuthContext = createContext({
    user: {
        id: undefined,
        firstName: undefined,
        lastName: undefined,
        avatar: undefined,
        roles: undefined,
        status: undefined
    },
    token: undefined,
    login: (user, token) => {},
    logout: () => {}
});
