import useProjects from '../hooks/useProjects'
import { User } from '../types'

type Props = {
	collaborator: User
}

const Collaborator = ({ collaborator }: Props) => {
	const { name, email } = collaborator
	const {handleModalDeleteCollaborator} = useProjects()

	return (
		<div className='border-b p-5 flex justify-between items-center'>
			<div>
				<p>{name}</p>
				<p className='text-gray-700 text-sm'>{email}</p>
			</div>
			<div>
				<button
					type='button'
					className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
					onClick={() => handleModalDeleteCollaborator(collaborator)}
				>
					Delete
				</button>
			</div>
		</div>
	)
}

export default Collaborator
