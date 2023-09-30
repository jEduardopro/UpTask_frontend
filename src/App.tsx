import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ConfirmAccount from './pages/ConfirmAccount'
import {AuthProvider} from './context/AuthProvider'

function App() {

  return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<AuthLayout />} >
						<Route index element={<Login />} />
						<Route path='register' element={<Register />} />
						<Route path='forgot-password' element={<ForgotPassword />} />
						<Route path='forgot-password/:token' element={<ResetPassword />} />
						<Route path='confirm-account/:id' element={<ConfirmAccount />} />
					</Route>
					<Route path="*" element={<h1>Not Found</h1>} />
				</Routes>
			</AuthProvider>
    </BrowserRouter>
  )
}

export default App
