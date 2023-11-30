import App from './App';
import { AuthContext } from './store/auth';
import { useAuth } from './hooks/auth';

const Wrapper = () => {
    const { user, token, login, logout } = useAuth();

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            <App />
        </AuthContext.Provider>
    );
};

export default Wrapper;
