import { ReactNode, createContext, useEffect, useState } from 'react'
import { AuthUser } from '../types';
import api from '../services/Api'
import { useNavigate } from 'react-router-dom';

export type AuthCtx = {
	auth: AuthUser;
	setAuth: (auth: AuthUser) => void;
	loading: boolean;
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
	setAuth: () => { },
	loading: true
}

const AuthContext = createContext<AuthCtx>(initialValue)

const AuthProvider = ({ children }: AuthProviderProps) => {

	const [auth, setAuth] = useState(initialValue.auth)
	const [loading, setLoading] = useState(true)

	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) {
			setLoading(false)
			return
		}
		
		const autheticateUser = async () => {
			setLoading(true)
			try {
				const { data } = await api.get('/users/profile', {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`
					}
				})
				setAuth(data)
				// navigate('/projects')
			} catch (error) {
				console.log(error);				
			}
			setLoading(false)
		}

		autheticateUser()
	}, [])

	return (
		<AuthContext.Provider
			value={{
				auth,
				setAuth,
				loading
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