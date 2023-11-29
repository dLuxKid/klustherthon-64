import { createContext, useContext, useReducer } from "react";

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
            console.log(action.payload)
            return { ...state, user: action.payload, authIsReady: true }
        case 'logout':
            return { ...state, user: null, authIsReady: true }
        case 'auth-is-ready':
            return { ...state, user: action.payload, authIsReady: true }
        default:
            return state;
    }
}

type Props = {
    children: React.ReactNode
}

export const AuthContextProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)