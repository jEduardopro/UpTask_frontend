import { useContext, useEffect, useState } from "react"
import ProjectsContext from "../context/ProjectsProvider"
import Message from "./Message"
import { useParams } from "react-router-dom"

const ProjectForm = () => {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [deadline, setDeadline] = useState('')
	const [client, setClient] = useState('')

	const { id } = useParams()
	const { showMessage, message, submitProject, project } = useContext(ProjectsContext)

	useEffect(() => {
		if (id && project) {
			setName(project.name)
			setDescription(project.description)
			setDeadline(project.deadline.split('T')[0])
			setClient(project.client)
		}
	}, [id])


	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if ([name, description, deadline, client].includes('')) {
			showMessage({ error: true, text: 'All fields are required' })
			return
		}

		await submitProject({ name, description, deadline, client }, id)
		setName('')
		setDescription('')
		setDeadline('')
		setClient('')
	}

	const {text} = message

	return (
		<form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow" onSubmit={handleSubmit}>
			{text && <Message message={message} />}

			<div className="mb-3">
				<label
					htmlFor="name"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Project Name
				</label>
				<input
					type="text"
					id="name"
					placeholder="Project Name"
					className="w-full mt-2 border p-2 rounded-md placeholder-gray-400"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className="mb-3">
				<label
					htmlFor="description"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Description
				</label>
				<textarea
					id="description"
					placeholder="Description"
					className="w-full mt-2 border p-2 rounded-md placeholder-gray-400"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<div className="mb-3">
				<label
					htmlFor="deadline"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Deadline
				</label>
				<input
					type="date"
					id="deadline"
					className="w-full mt-2 border p-2 rounded-md placeholder-gray-400"
					value={deadline}
					onChange={(e) => setDeadline(e.target.value)}
				/>
			</div>
			<div className="mb-3">
				<label
					htmlFor="client"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Client
				</label>
				<input
					type="text"
					id="client"
					placeholder="Client"
					className="w-full mt-2 border p-2 rounded-md placeholder-gray-400"
					value={client}
					onChange={(e) => setClient(e.target.value)}
				/>
			</div>

			<button
				type="submit"
				className="w-full bg-sky-600 text-white p-3 rounded-md hover:bg-sky-700 transition duration-300"
			>
				{id ? 'Update Project' : 'Create Project'}
			</button>

		</form>
	)
}

export default ProjectForm
