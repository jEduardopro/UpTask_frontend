import { ReactNode, createContext, useEffect, useState } from "react";
import api from '../services/Api'
import { Project, ProjectPayload, Task, TaskPayload, User } from "../types";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import handleError from "../utils/error.handle";

interface ProjectsProviderProps {
	children: ReactNode;
}

type Message = {
	error: boolean;
	text: string;
}

export type ProjectsCtx = {
	projects: Project[];
	setProjects: (projects: Project[]) => void;
	message: Message;
	showMessage: (message: Message) => void;
	submitProject: (project: ProjectPayload, id?:string) => Promise<void>;
	getProject: (id: string) => Promise<void>;
	project: Project | null;
	loading: boolean;
	deleteProject: (id: string) => Promise<void>;
	modalFormTask: boolean;
	handleModalTask: () => void;
	submitTask: (task: TaskPayload, projectId: string, id: string|null) => Promise<void>;
	handleModalEditTask: (task: Task) => void;
	task: Task | null;
	handleModalDeleteTask: (task: Task|null) => void;
	modalDeleteTask: boolean;
	deleteTask: () => Promise<void>;
	submitCollaborator: (email: string) => Promise<void>;
	collaborator: User | null;
	addCollaborator: (email: string) => Promise<void>;
	modalDeleteCollaborator: boolean;
	handleModalDeleteCollaborator: (collaborator: User | null) => void;
	deleteCollaborator: () => Promise<void>;
}

const initialValue = {
	projects: [],
	setProjects: () => { },
	message: { error: false, text: '' },
	showMessage: () => { },
	submitProject: async () => { },
	getProject: async () => { },
	project: null,
	loading: true,
	deleteProject: async () => { },
	modalFormTask: false,
	handleModalTask: () => { },
	submitTask: async () => { },
	handleModalEditTask: () => { },
	task: null,
	handleModalDeleteTask: () => { },
	modalDeleteTask: false,
	deleteTask: async () => { },
	submitCollaborator: async () => { },
	collaborator: null,
	addCollaborator: async () => { },
	modalDeleteCollaborator: false,
	handleModalDeleteCollaborator: () => { },
	deleteCollaborator: async () => { },
}

const ProjectsContext = createContext<ProjectsCtx>(initialValue)

const ProjectsProvider = ({ children }: ProjectsProviderProps) => {

	const [projects, setProjects] = useState<Project[]>(initialValue.projects)
	const [message, setMessage] = useState<Message>({ error: false, text: '' })
	const [project, setProject] = useState<Project | null>(null)
	const [loading, setLoading] = useState(true)
	const [modalFormTask, setModalFormTask] = useState(false)
	const [task, setTask] = useState<Task | null>(initialValue.task)
	const [modalDeleteTask, setModalDeleteTask] = useState(false)
	const [collaborator, setCollaborator] = useState<User | null>(null)
	const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false)
	const navigate = useNavigate()

	const {auth} = useAuth()

	useEffect(() => {		
		const getProjects = async () => {
			try {
				const token = localStorage.getItem('token')
				if (!token) return
				
				const config = {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				}
				const { data } = await api.get('/projects', config)
				setProjects(data)
			} catch (error) {
				console.log(error);				
			}
		}
		getProjects()
	}, [auth])

	const showMessage = (message: Message) => {
		setMessage(message)
		setTimeout(() => {
			setMessage({ error: false, text: '' })
		}, 3500)
	}

	const submitProject = async (project: ProjectPayload, id?: string) => {
		if (id) {
			updateProject(project, id)
		} else {
			createProject(project)
		}
	}

	const createProject = async (project: ProjectPayload) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) return
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			}
			const { data } = await api.post('/projects', project, config)
			setProjects([...projects, data])
			showMessage({ error: false, text: 'Project created successfully' })
			setTimeout(() => {
				showMessage({ error: false, text: '' })
				navigate('/projects')
			}, 1000);
		} catch (error) {
			console.log(error);			
		}
	}

	const updateProject = async (project: ProjectPayload, id: string) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) return
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			}
			const { data } = await api.put(`/projects/${id}`, project, config)
			
			setProjects(projects.map(p => p._id === id ? data : p))
			showMessage({ error: false, text: 'Project updated successfully' })
			setTimeout(() => {
				showMessage({ error: false, text: '' })
				navigate('/projects')
			}, 1000);
		} catch (error) {
			console.log(error);			
		}
	}

	const getProject = async (id: string) => {
		setLoading(true)
		try {
			const token = localStorage.getItem('token')
			if (!token) return
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			}
			const { data } = await api.get(`/projects/${id}`, config)
			setProject(data)
		} catch (error) {
			console.log(error);
			setMessage({ error: true, text: handleError(error) })
		}
		setLoading(false)
	}

	const deleteProject = async (id: string) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) return
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			}
			const { data } = await api.delete(`/projects/${id}`, config)
			setProjects(projects.filter(p => p._id !== id))
			setMessage({ error: false, text: data.message })
			setTimeout(() => {
				showMessage({ error: false, text: '' })
				navigate('/projects')
			}, 1000);
		} catch (error) {
			console.log(error);			
		}
	}

	const handleModalTask = () => {
		setModalFormTask(!modalFormTask)
		setTask(null)
	}

	const submitTask = async (task: TaskPayload, projectId: string, id: string|null) => {
		if (id) {
			await updateTask(task, projectId, id)
		} else {
			await createTask(task, projectId)
		}
	}

	const createTask = async (task: TaskPayload, projectId: string) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) return
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			}

			const { data } = await api.post(`/tasks`, {...task, project: projectId}, config)
			
			const projectUpdated = { ...project! }
			projectUpdated.tasks = [...project!.tasks, data]			
			setProject(projectUpdated)
			setMessage({ error: false, text: '' })
			setModalFormTask(false)
		} catch (error) {
			console.log(error);			
		}
	}

	const updateTask = async (task: TaskPayload, projectId: string, id: string) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) return
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			}

			const { data } = await api.put(`/tasks/${id}`, {...task, project: projectId}, config)
			
			const projectUpdated = { ...project! }
			projectUpdated.tasks = project!.tasks.map(t => t._id === id ? data : t)			
			setProject(projectUpdated)
			setMessage({ error: false, text: '' })
			setModalFormTask(false)
		} catch (error) {
			console.log(error);			
		}
	}

	const handleModalEditTask = (task: Task) => {
		setTask(task)
		setModalFormTask(true)
	}

	const handleModalDeleteTask = (task: Task|null) => {
		setTask(task)
		setModalDeleteTask(!modalDeleteTask)
	}

	const deleteTask = async () => {
		try {
			const token = localStorage.getItem('token')
			if (!token) return
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			}
			const { data } = await api.delete(`/tasks/${task?._id}`, config)
			setMessage({ error: false, text: data.message })
			
			const projectUpdated = { ...project! }
			projectUpdated.tasks = project!.tasks.filter(t => t._id !== task?._id)
			setProject(projectUpdated)
			setModalDeleteTask(false)
			setTask(null)
			setTimeout(() => {
				setMessage({ error: false, text: '' })
			}, 2500);
		} catch (error) {
			console.log(error);			
		}
	}

	const submitCollaborator = async (email: string) => {
		setLoading(true)
		try {
			const token = localStorage.getItem('token')
			if (!token) return
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			}
			const { data } = await api.post(`projects/collaborators`, {email}, config)
			console.log(data);
			setCollaborator(data)
			setMessage({ error: false, text: '' })
		} catch (error) {
			console.log(error);
			setMessage({ error: true, text: handleError(error) })
		}
		setLoading(false)
	}

	const addCollaborator = async (email: string) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) return
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			}

			const { data } = await api.post(`projects/${project?._id}/collaborators`, {email}, config)

			setMessage({ error: false, text: data.message })
			setCollaborator(null)
			setTimeout(() => {
				setMessage({ error: false, text: '' })
			}, 2500);
		} catch (error) {
			console.log(error);	
			setMessage({ error: true, text: handleError(error) })
		}
	}

	const handleModalDeleteCollaborator = (collaborator: User|null) => {
		setModalDeleteCollaborator(!modalDeleteCollaborator)
		setCollaborator(collaborator)
	}

	const deleteCollaborator = async () => {
		try {
			const token = localStorage.getItem('token')
			if (!token) return
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			}

			const { data } = await api.delete(`projects/${project?._id}/remove-collaborator/${collaborator?._id}`, config)

			const projectUpdated = { ...project! }
			projectUpdated.collaborators = project!.collaborators.filter(c => c._id !== collaborator?._id)
			setProject(projectUpdated)

			setMessage({ error: false, text: data.message })
			setCollaborator(null)
			setModalDeleteCollaborator(false)
			setTimeout(() => {
				setMessage({ error: false, text: '' })
			}, 2500);
		} catch (error) {
			console.log(error);	
			setMessage({ error: true, text: handleError(error) })
		}
	}

	return (
		<ProjectsContext.Provider
			value={{
				projects,
				setProjects,
				message,
				showMessage,
				submitProject,
				getProject,
				project,
				loading,
				deleteProject,
				modalFormTask,
				handleModalTask,
				submitTask,
				handleModalEditTask,
				task,
				handleModalDeleteTask,
				modalDeleteTask,
				deleteTask,
				submitCollaborator,
				collaborator,
				addCollaborator,
				modalDeleteCollaborator,
				handleModalDeleteCollaborator,
				deleteCollaborator
			}}
		>
			{children}
		</ProjectsContext.Provider>
	)

}

export {
	ProjectsProvider
}

export default ProjectsContext