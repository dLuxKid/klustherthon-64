import { createContext, useContext, useEffect, useReducer } from "react";

export type authContextType = {
    user: any;
    authIsReady: boolean;
    dispatch: React.Dispatch<authActions>;
};

export interface authState {
    user: any;
    authIsReady: boolean;
}

export interface authActions {
    type: string;
    payload?: any;
}

const AuthContext = createContext({} as authContextType)

const initialState = {
    user: null,
    authIsReady: false
}

const authReducer = (state: authState, action: authActions) => {
    switch (action.type) {
        case 'login':
            return { user: action.payload, authIsReady: true }
        case 'logout':
            return { user: null, authIsReady: true }
        case 'auth-is-ready':
            return { user: action.payload, authIsReady: true }
        default:
            return state;
    }
}

type Props = {
    children: React.ReactNode
}

export const AuthContextProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            dispatch({ type: "login", payload: JSON.parse(storedUser) });
        } else {
            dispatch({ type: "auth-is-ready", payload: null });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)