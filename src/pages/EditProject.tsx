import { useEffect } from 'react'
import useProjects from '../hooks/useProjects'
import { useParams } from 'react-router-dom'
import ProjectForm from '../components/ProjectForm'

const EditProject = () => {
	const { id } = useParams()

	const { getProject, project, loading } = useProjects()
	
	useEffect(() => {
		getProject(id!)
	}, [])

	if (loading) return <div>Loading...</div>
	
	if (!project) return <div>Project not found</div>

	return (
		<div>
			<h1 className='font-bold text-4xl'>Edit: {project.name}</h1>

			<div className="mt-10 flex justify-center">
				<ProjectForm />
			</div>
		</div>
	)
}

export default EditProject
