import useAdmin from '../hooks/useAdmin';
import useProjects from '../hooks/useProjects';
import { Task as TaskType } from '../types'
import { formatDate } from '../utils/formatDate';

type Props = {
	task: TaskType
}

const Task = ({ task }: Props) => {
	const {handleModalEditTask, handleModalDeleteTask, toggleTaskStatus} = useProjects()
	const { name, description, deadline, priority, status} = task
	const admin = useAdmin()
	
	return (
		<div className='border-b p-5 flex justify-between items-center'>
			<div className='flex flex-col items-start'>
				<p className='text-xl mb-1'>{name}</p>
				<p className='text-sm text-gray-500 mb-1'>{description}</p>
				<p className='text-sm mb-1'>{formatDate(deadline)}</p>
				<p className='text-gray-600'>Priority: {priority}</p>
				{status && (
					<p className='text-xs bg-green-600 text-white uppercase p-1 rounded-lg'>completed by: {task.completed.name}</p>
				)}
			</div>
			<div className='flex gap-2'>
				{admin && (
					<button
						className='bg-indigo-600 px-4 py-3 text-sm rounded-lg text-white'
						onClick={() => handleModalEditTask(task)}
					>
						Edit
					</button>
				)}

				<button
					className={`${status ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-sm rounded-lg text-white`}
					onClick={() => toggleTaskStatus(task._id)}
				>
					{status ? 'Complete' : 'Incomplete'}
				</button>
					
				{admin && (
					<button
						className='bg-red-600 px-4 py-3 text-sm rounded-lg text-white'
						onClick={() => handleModalDeleteTask(task)}
					>
						Delete
					</button>

				)}
			</div>
		</div>
	)
}

export default Task
