import { Link } from "react-router-dom"

const Register = () => {
	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl">Create your account and manage your projects</h1>
			<form className="bg-white shadow rounded-lg my-10 px-8 py-10">
				<div className="my-5">
					<label htmlFor="name" className="uppercase text-slate-600 block text-lg font-bold">Name</label>
					<input
						id="name"
						type="text"
						placeholder="Name"
						className="w-full mt-1 p-2 border border-slate-200 rounded bg-slate-50 outline-none"
					/>
				</div>
				<div className="my-5">
					<label htmlFor="email" className="uppercase text-slate-600 block text-lg font-bold">Email</label>
					<input
						id="email"
						type="email"
						placeholder="Email"
						className="w-full mt-1 p-2 border border-slate-200 rounded bg-slate-50 outline-none"
					/>
				</div>
				<div className="my-5">
					<label htmlFor="password" className="uppercase text-slate-600 block text-lg font-bold">Password</label>
					<input
						id="password"
						type="password"
						placeholder="Password"
						className="w-full mt-1 p-2 border border-slate-200 rounded bg-slate-50 outline-none"
					/>
				</div>
				<div className="my-5">
					<label htmlFor="confirmPassword" className="uppercase text-slate-600 block text-lg font-bold">Confirm Password</label>
					<input
						id="confirmPassword"
						type="password"
						placeholder="Confirm Password"
						className="w-full mt-1 p-2 border border-slate-200 rounded bg-slate-50 outline-none"
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
