import { FormEvent, useState } from "react"
import { Link } from "react-router-dom"
import Message from "../components/Message"
import axios, { AxiosError } from 'axios'

const Register = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('correo@gmail.com')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState({
		error: false,
		text: ''
	})

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		if ([name, email, password, confirmPassword].includes('')) {
			setMessage({ error: true, text: 'Please fill in all fields' })
			return
		}

		if (password !== confirmPassword) {
			setMessage({ error: true, text: 'Passwords do not match' })
			return
		}

		if (password.length < 6) {
			setMessage({ error: true, text: 'Password must be at least 6 characters' })
			return
		}

		setMessage({ error: false, text: '' })

		try {
			const payload = {
				name,
				email,
				password
			}
			const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, payload)
			console.log(data);
			setMessage({ error: false, text: data.message })
		} catch (error: unknown) {
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
			<h1 className="text-sky-600 font-black text-6xl">Create your account and manage your projects</h1>

			{text && <Message message={message} /> }

			<form className="bg-white shadow rounded-lg my-10 px-8 py-10"
				onSubmit={handleSubmit}
			>
				<div className="my-5">
					<label htmlFor="name" className="uppercase text-slate-600 block text-lg font-bold">Name</label>
					<input
						id="name"
						type="text"
						placeholder="Name"
						className="w-full mt-1 p-2 border border-slate-200 rounded bg-slate-50 outline-none"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
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
				<div className="my-5">
					<label htmlFor="password" className="uppercase text-slate-600 block text-lg font-bold">Password</label>
					<input
						id="password"
						type="password"
						placeholder="Password"
						className="w-full mt-1 p-2 border border-slate-200 rounded bg-slate-50 outline-none"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="my-5">
					<label htmlFor="confirmPassword" className="uppercase text-slate-600 block text-lg font-bold">Confirm Password</label>
					<input
						id="confirmPassword"
						type="password"
						placeholder="Confirm Password"
						className="w-full mt-1 p-2 border border-slate-200 rounded bg-slate-50 outline-none"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>

				<button type="submit" className="bg-sky-700 text-white font-bold w-full rounded py-2 hover:bg-sky-800 transition-colors">
					Sign Up
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
					to='/forgot-password'
				>
					Forgot your password?
				</Link>
			</nav>
		</>
	)
}

export default Register
