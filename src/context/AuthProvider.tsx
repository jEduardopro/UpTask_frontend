import { ReactNode, createContext, useEffect, useState } from 'react'
import { AuthUser } from '../types';
import api from '../services/Api'

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

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) return
		
		const autheticateUser = async () => {
			try {
				const { data } = await api.get('/users/profile', {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`
					}
				})
				setAuth(data)				
			} catch (error) {
				console.log(error);				
			}
		}

		autheticateUser()
	}, [])

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