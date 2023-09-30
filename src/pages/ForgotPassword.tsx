import { useState } from 'react'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import api from '../services/Api'
import handleError from '../utils/error.handle'

const ForgotPassword = () => {
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState({
		error: false,
		text: ''
	})

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		
		if (email === '') {
			setMessage({
				error: true,
				text: 'Please enter your email'
			})
			return
		}

		try {
			const { data } = await api.post(`/users/forgot-password`, { email })			
			setMessage({ error: false, text: data.message })
		} catch (error) {
			setMessage({ error: true, text: handleError(error) })
		}
	}

	const {text} = message

	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl">Recover your access and don't lose your projects</h1>
			{
				text && (<Message message={message} />)
			}
			<form className="bg-white shadow rounded-lg my-10 px-8 py-10"
				onSubmit={handleSubmit}
			>
				<div className="my-5">
					<label htmlFor="email" className="uppercase text-slate-600 block text-lg font-bold">Email</label>
					<input
						id="email"
						type="email"
						placeholder="Email"
						className="w-full mt-1 p-2 border border-slate-200 rounded bg-slate-50 outline-none"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<button type="submit" className="bg-sky-700 text-white font-bold w-full rounded py-2 hover:bg-sky-800 transition-colors">
					Send Email
				</button>
			</form>

			<nav className="flex justify-between">
				<Link
					className="block text-center my-5 text-slate-500 text-sm"
					to='/'
				>
					Already have an account? Sign in
				</Link>
				<Link
					className="block text-center my-5 text-slate-500 text-sm"
					to='/register'
				>
					Don't have an account? Sign up
				</Link>
			</nav>	
		</>
	)
}

export default ForgotPassword
