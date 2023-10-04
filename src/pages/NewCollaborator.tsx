import { useEffect } from 'react'
import CollaboratorForm from '../components/CollaboratorForm'
import useProjects from '../hooks/useProjects'
import { useParams } from 'react-router-dom'
import Message from '../components/Message'

const NewCollaborator = () => {
	const params = useParams()
	const {getProject, project, loading, collaborator, addCollaborator, message} = useProjects()
	useEffect(() => {
		if (params.id) {
			getProject(params.id)
		}
	}, [])

	if (!project?._id) return <Message message={message} />

	// if (loading) return <div>Loading...</div>

	return (
		<>
			<h1 className='text-4xl font-black'>Add Collaborator to {project?.name}</h1>

			<div className='mt-10 flex justify-center'>
				<CollaboratorForm />
			</div>

			{
				loading ? <p className='text-center'>Loading...</p> : collaborator?._id && (
					<div className='flex justify-center mt-10'>
						<div className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'>
							<h2 className='text-center mb-10 text-2xl font-bold'>Result:</h2>

							<div className='flex justify-between items-center'>
								<p>{collaborator.name}</p>

								<button
									type='button'
									className='bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm'
									onClick={() => addCollaborator(collaborator.email)}
								>
									Add to project
								</button>
							</div>
						</div>
					</div>
				)
			}
		</>
	)
}

export default NewCollaborator
