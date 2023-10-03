import React, { useState } from 'react'
import useProjects from '../hooks/useProjects'
import Message from './Message'

const CollaboratorForm = () => {
	const [email, setEmail] = useState('')

	const { showMessage, message } = useProjects()
	
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (email === '') {
			showMessage({ error: true, text: 'Email is required' })
			return
		}
	}

	return (
		<form
			className='bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow'
			onSubmit={handleSubmit}
		>
			{message.text && (<Message message={message} />)}
			<div className='mb-5'>
				<label htmlFor="email" className='text-gray-700 text-sm font-bold'>Email</label>
				<input
					type="email"
					id='email'
					placeholder='Email'
					className='border w-full p-2 mt-1 placeholder-gray-400 rounded-md'
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
			</div>

			<input
				type="submit"
				value='Search Collaborator'
				className='bg-sky-600 hover:bg-sky-700 cursor-pointer transition-colors w-full p-2 text-white uppercase font-bold rounded-md'
			/>
		</form>
	)
}

export default CollaboratorForm
