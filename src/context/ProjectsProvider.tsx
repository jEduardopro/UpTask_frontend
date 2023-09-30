import { ReactNode, createContext, useState } from "react";

interface ProjectsProviderProps {
	children: ReactNode;
}

export type ProjectsCtx = {
	projects: unknown[];
	setProjects: (projects: []) => void;
}

const initialValue = {
	projects: [],
	setProjects: () => { }
}

const ProjectsContext = createContext<ProjectsCtx>(initialValue)

const ProjectsProvider = ({ children }: ProjectsProviderProps) => {

	const [projects, setProjects] = useState<ProjectsCtx[]>([])

	return (
		<ProjectsContext.Provider
			value={{
				projects,
				setProjects
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