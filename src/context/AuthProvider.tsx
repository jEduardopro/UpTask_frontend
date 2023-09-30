import { ReactNode, createContext, useState } from 'react'
import { AuthUser } from '../types';

export type AuthCtx = {
	auth: AuthUser;
	setAuth: (auth: AuthUser) => void;
}

interface AuthProviderProps {
	children: ReactNode;
}

const initialValue = {
	auth: {
		id: '',
		name: '',
		email: '',
	},
	setAuth: () => {}
}

const AuthContext = createContext<AuthCtx>(initialValue)

const AuthProvider = ({ children }: AuthProviderProps) => {

	const [auth, setAuth] = useState(initialValue.auth)

	return (
		<AuthContext.Provider
			value={{
				auth,
				setAuth
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export {
	AuthProvider
}

export default AuthContext