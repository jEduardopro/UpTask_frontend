
const ResetPassword = () => {
	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl">Reset your password and don't lose access of your projects</h1>
			<form className="bg-white shadow rounded-lg my-10 px-8 py-10">				
				<div className="my-5">
					<label htmlFor="password" className="uppercase text-slate-600 block text-lg font-bold">New Password</label>
					<input
						id="password"
						type="password"
						placeholder="New Password"
						className="w-full mt-1 p-2 border border-slate-200 rounded bg-slate-50 outline-none"
					/>
				</div>

				<button type="submit" className="bg-sky-700 text-white font-bold w-full rounded py-2 hover:bg-sky-800 transition-colors">
					Reset Password
				</button>
			</form>
		</>
	)
}

export default ResetPassword
