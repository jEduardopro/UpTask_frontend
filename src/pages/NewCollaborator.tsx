import { useEffect } from 'react'
import CollaboratorForm from '../components/CollaboratorForm'
import useProjects from '../hooks/useProjects'
import { useParams } from 'react-router-dom'

const NewCollaborator = () => {
	const params = useParams()
	const {getProject, project, loading} = useProjects()
	useEffect(() => {
		if (params.id) {
			getProject(params.id)
		}
	}, [])

	if (loading) return <div>Loading...</div>

	return (
		<>
			<h1 className='text-4xl font-black'>Add Collaborator to {project?.name}</h1>

			<div className='mt-10 flex justify-center'>
				<CollaboratorForm />
			</div>
		</>
	)
}

export default NewCollaborator
