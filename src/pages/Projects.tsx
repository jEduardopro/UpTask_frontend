import ProjectPreview from "../components/ProjectPreview";
import Message from '../components/Message'
import useProjects from "../hooks/useProjects";

const Projects = () => {
	const { projects, message } = useProjects()

	const {text} = message
	
	return (
		<>
			<h1 className='text-4xl font-black'>Projects</h1>

			{text && <Message message={message} />}

			<div className="bg-white shadow mt-10 rounded-lg">
				{projects.length ?
					projects.map(project => <ProjectPreview key={project._id} project={project} />)

					: <p className="mt-5 text-gray-600 uppercase p-5">No projects yet</p>}
			</div>
		</>
	)
}

export default Projects
