import { Link } from 'react-router-dom';
import { Project } from '../types';

type Props = {
	project: Project;
}

const ProjectPreview = ({ project }: Props) => {
	const { name, client, _id } = project

	return (
		<div className='border-b p-5 flex items-center'>
			<p className='flex-1'>
				{name}
				<span className='text-sm text-gray-500 uppercase'>{' '}{client}</span>
			</p>
			<Link
				to={`/projects/${_id}`}
				className='text-gray-600 hover:text-gray-800 text-sm font-bold'
			>
				See Project
			</Link>
		</div>
	)
}

export default ProjectPreview
