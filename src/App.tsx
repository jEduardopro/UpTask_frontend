import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ConfirmAccount from './pages/ConfirmAccount'
import {AuthProvider} from './context/AuthProvider'
import Layout from './layouts/Layout'
import Projects from './pages/Projects'
import NewProject from './pages/NewProject'
import { ProjectsProvider } from './context/ProjectsProvider'
import Project from './pages/Project'
import EditProject from './pages/EditProject'
import NewCollaborator from './pages/NewCollaborator'

function App() {

  return (
		<BrowserRouter>
			<AuthProvider>
				<ProjectsProvider>
					<Routes>
						<Route path="/" element={<AuthLayout />} >
							<Route index element={<Login />} />
							<Route path='register' element={<Register />} />
							<Route path='forgot-password' element={<ForgotPassword />} />
							<Route path='forgot-password/:token' element={<ResetPassword />} />
							<Route path='confirm-account/:id' element={<ConfirmAccount />} />
						</Route>
						<Route path='/projects' element={<Layout/>}>
							<Route index element={<Projects/>} />
							<Route path='create-project' element={<NewProject/>} />
							<Route path=':id/collaborators' element={<NewCollaborator/>} />
							<Route path=':id' element={<Project/>} />
							<Route path=':id/edit' element={<EditProject/>} />
						</Route>
						<Route path="*" element={<h1>Not Found</h1>} />
					</Routes>
				</ProjectsProvider>					
			</AuthProvider>
    </BrowserRouter>
  )
}

export default App
