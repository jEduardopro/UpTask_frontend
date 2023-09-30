import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Layout = () => {
	const {auth, loading} = useAuth()

	if (loading) {
		return <h1>Loading...</h1>
	}

	return (
		<>
			{auth.id ? (
				<Outlet />
			) : <Navigate to='/' />}
		</>
	)
}

export default Layout
