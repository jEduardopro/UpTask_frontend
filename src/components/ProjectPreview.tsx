import { Link } from 'react-router-dom';
import { Project } from '../types';
import useAuth from '../hooks/useAuth';

type Props = {
	project: Project;
}

const ProjectPreview = ({ project }: Props) => {
	const {auth} = useAuth()
	const { name, client, _id, creator } = project

	return (
		<div className='border-b p-5 flex items-center justify-between'>
			<div className='flex items-center gap-2'>
				<p className='flex-1'>
					{name}
					<span className='text-sm text-gray-500 uppercase'>{' '}{client}</span>
				</p>

				{
					auth.id !== creator && (
						<p className='p-1 text-xs bg-green-500 text-white rounded-lg'>Collaborator</p>
					)
				}
			</div>

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
