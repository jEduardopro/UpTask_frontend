import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Message from "../components/Message"
import api from '../services/Api'
import handleError from "../utils/error.handle"

const ResetPassword = () => {
	const {token} = useParams()
	const [newPassword, setNewPassword] = useState('')
	const [tokenVerified, setTokenVerified] = useState(false)
	const [passwordChanged, setPasswordChanged] = useState(false)
	const [message, setMessage] = useState({
		error: false,
		text: ''
	})

	const verifyToken = async () => {
		try {
			await api.get(`/users/forgot-password/${token}`)
			setTokenVerified(true)
		} catch (error) {
			setMessage({ error: true, text: handleError(error) })
		}
	}

	useEffect(() => {
		verifyToken()
	}, [])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (newPassword === '') {
			setMessage({ error: true, text: 'Please enter your new password' })
			return
		}

		if (newPassword.length < 6) {
			setMessage({ error: true, text: 'Password must be at least 6 characters' })
			return
		}

		try {
			const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/reset-password/${token}`, { password: newPassword })
			setMessage({ error: false, text: data.message })
			setPasswordChanged(true)
		} catch (error) {
			if (!axios.isAxiosError(error)) {
				setMessage({ error: true, text: 'Something went wrong' })
				return
			}
			const axiosError = error as AxiosError<{ message: string }>
			if (axiosError.response) {
				setMessage({ error: true, text: axiosError.response.data.message })
			} else {
				setMessage({ error: true, text: axiosError.message })
			}
		}
	}

	const {text} = message

	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl">Reset your password and don't lose access of your projects</h1>

			{ text && (<Message message={message} />)}

			{
				tokenVerified && (
					<form className="bg-white shadow rounded-lg my-10 px-8 py-10"
						onSubmit={handleSubmit}
					>				
						<div className="my-5">
							<label htmlFor="password" className="uppercase text-slate-600 block text-lg font-bold">New Password</label>
							<input
								id="password"
								type="password"
								placeholder="New Password"
								className="w-full mt-1 p-2 border border-slate-200 rounded bg-slate-50 outline-none"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
							/>
						</div>

						<button type="submit" className="bg-sky-700 text-white font-bold w-full rounded py-2 hover:bg-sky-800 transition-colors">
							Reset Password
						</button>
					</form>
				)
			}

			{
				passwordChanged && (
					<Link
						className="block text-center my-5 text-slate-500 text-sm"
						to='/'
					>
						Sign in
					</Link>
				)
			}
		</>
	)
}

export default ResetPassword
