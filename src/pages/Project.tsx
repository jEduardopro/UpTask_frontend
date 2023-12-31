import { Link, useParams } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import { useEffect } from 'react'
import ModalFormTask from '../components/ModalFormTask'
import Task from '../components/Task'
import ModalDeleteTask from '../components/ModalDeleteTask'
import Collaborator from '../components/Collaborator'
import ModalDeleteCollaborator from '../components/ModalDeleteCollaborator'
import useAdmin from '../hooks/useAdmin'
import io, { Socket } from 'socket.io-client'
import { Task as TaskType } from '../types'

let socket: Socket;

const Project = () => {
	const { id } = useParams()
	const { getProject, project, loading, handleModalTask, submitProjectTasks, updateProjectTask, deleteProjectTask, changeStatusTask} = useProjects()
	const admin = useAdmin()
	
	useEffect(() => {
		getProject(id!)
	}, [])

	useEffect(() => {
		socket = io(import.meta.env.VITE_API_URL)
		socket.emit('open project', id)
	}, [])

	useEffect(() => {
		socket.on('task created', (task: TaskType) => {
			if (task.project === project?._id) {
				submitProjectTasks(task)			
			}
		})
	
		socket.on('task updated', (task: TaskType) => {
			if (task.project === project?._id) {
				updateProjectTask(task)			
			}
		})

		socket.on('task deleted', (task: TaskType) => {
			if (task.project === project?._id) {
				deleteProjectTask(task)			
			}
		})

		socket.on('task status changed', (task: TaskType) => {			
			if (typeof task.project === 'string') {
				return
			}
			if ('_id' in task.project && task.project._id === project?._id) {
				changeStatusTask(task)			
			}
		})
	})

	if (loading) return <div>Loading...</div>

	return (
		<>
			<div className='flex justify-between'>
				<h1 className='font-bold text-4xl'>{project?.name}</h1>

				{
					admin && (
						<div className='flex items-center gap-x-2 text-gray-400 hover:text-gray-700'>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
							</svg>

							<Link
								to={`/projects/${project?._id}/edit`}
								className='uppercase font-semibold'
							>
								Edit
							</Link>
						</div>
					)
				}

			</div>

			{admin && (
				<button
					type='button'
					className='text-sm px-5 py-3 mt-5 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center flex items-center gap-x-2'
					onClick={handleModalTask}
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>

					New Task
				</button>
			)}
			

			<p className='font-bold text-xl mt-10'>Tasks</p>

			<div className='bg-white shadow mt-10 rounded-lg'>
				{
					project?.tasks.length ?
						project?.tasks.map(task => (
							<Task task={task} key={task._id} />
						))
						: (
							<p className='text-center my-5 p-10'>No tasks yet</p>
						)
				}
			</div>

			{admin && (
				<>
					<div className='flex items-center justify-between mt-10'>
						<p className='font-bold text-xl'>Collaborators</p>
						<Link
							to={`/projects/${project?._id}/collaborators`}
							className='text-gray-400 font-bold uppercase hover:text-gray-700'
						>
							Add new collaborator
						</Link>
					</div>

					<div className='bg-white shadow mt-10 rounded-lg'>
						{
							project?.collaborators.length ?
								project?.collaborators.map(collaborator => (
									<Collaborator collaborator={collaborator} key={collaborator._id} />
								))
								: (
									<p className='text-center my-5 p-10'>No collaborators yet</p>
								)
						}
					</div>
				</>	
			)}


			<ModalFormTask />
			<ModalDeleteTask />
			<ModalDeleteCollaborator />
		</>
	
	)
}

export default Project
