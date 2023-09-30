import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Message from "../components/Message";
import api from '../services/Api'
import handleError from "../utils/error.handle";

const ConfirmAccount = () => {
	const [message, setMessage] = useState({
		error: false,
		text: ''
	})
	const [accountConfirmed, setAccountConfirmed] = useState(false)
	const {id} = useParams()

	const confirmAccount = async () => {
		if (accountConfirmed) return
		
		try {
			const { data } = await api.get(`/users/confirm/${id}`)
			setMessage({ error: false, text: data.message })
			setAccountConfirmed(true)
		} catch (error) {
			setMessage({ error: true, text: handleError(error) })			
		}
	}
	
	useEffect(() => {
		confirmAccount()
	}, [])

	const {text} = message

	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl">Confirm your account and start to create your projects</h1>
			<div className="mt-20 md:mt-10 shadow-lg bg-white px-5 py-10 rounded-xl">
				{text && <Message message={message} />}
				{
					accountConfirmed && (
						<Link
							className="block text-center my-5 text-slate-500 text-sm"
							to='/'
						>
							Sign in
						</Link>
					)
				}
			</div>
		</>
	)
}

export default ConfirmAccount
