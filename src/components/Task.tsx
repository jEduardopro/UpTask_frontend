import { Task as TaskType } from '../types'
import { formatDate } from '../utils/formatDate';

type Props = {
	task: TaskType
}

const Task = ({ task }: Props) => {
	const {name, description, deadline, priority, status, _id} = task
	return (
		<div className='border-b p-5 flex justify-between items-center'>
			<div>
				<p className='text-xl mb-1'>{name}</p>
				<p className='text-sm text-gray-500 mb-1'>{description}</p>
				<p className='text-xl mb-1'>{formatDate(deadline)}</p>
				<p className='text-gray-600'>Priority: {priority}</p>
			</div>
			<div className='flex gap-2'>
				<button
					className='bg-indigo-600 px-4 py-3 text-sm rounded-lg text-white'
				>
					Edit
				</button>
				{
					status ? (
						<button
							className='bg-sky-600 px-4 py-3 text-sm rounded-lg text-white'
						>
							Complete
						</button>

					) : (
						<button
							className='bg-gray-600 px-4 py-3 text-sm rounded-lg text-white'
						>
							Incomplete
						</button>							
					)
				}
				<button
					className='bg-red-600 px-4 py-3 text-sm rounded-lg text-white'
				>
					Delete
				</button>
			</div>
		</div>
	)
}

export default Task
