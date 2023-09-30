import { useContext } from "react"
import ProjectsContext from "../context/ProjectsProvider"
import ProjectPreview from "../components/ProjectPreview";

const Projects = () => {
	const { projects } = useContext(ProjectsContext)
	
	console.log(projects);	

	return (
		<>
			<h1 className='text-4xl font-black'>Projects</h1>

			<div className="bg-white shadow mt-10 rounded-lg">
				{projects.length ?
					projects.map(project => <ProjectPreview key={project._id} project={project} />)

					: <p className="mt-5 text-gray-600 uppercase p-5">No projects yet</p>}
			</div>
		</>
	)
}

export default Projects
