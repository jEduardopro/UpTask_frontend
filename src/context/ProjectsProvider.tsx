import { ReactNode, createContext, useEffect, useState } from "react";
import api from '../services/Api'
import { Project, ProjectPayload, Task, TaskPayload } from "../types";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

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
	task: null
}

const ProjectsContext = createContext<ProjectsCtx>(initialValue)

const ProjectsProvider = ({ children }: ProjectsProviderProps) => {

	const [projects, setProjects] = useState<Project[]>(initialValue.projects)
	const [message, setMessage] = useState<Message>({ error: false, text: '' })
	const [project, setProject] = useState<Project | null>(null)
	const [loading, setLoading] = useState(true)
	const [modalFormTask, setModalFormTask] = useState(false)
	const [task, setTask] = useState<Task|null>(initialValue.task)
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
				task
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