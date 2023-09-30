import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Sidebar = () => {
	const {auth} = useAuth()

	return (
		<aside className='md:w-80 lg:96 px-5 py-10'>
			<p className="text-xl font-bold capitalize">Hello: {auth.name}</p>

			<Link
				to='create-project'
				className="bg-sky-600 text-white px-5 py-3 rounded-md block mt-5 text-center"
			>
				New Project
			</Link>
			
		</aside>
	)
}

export default Sidebar
