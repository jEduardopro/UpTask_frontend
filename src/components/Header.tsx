import { Link } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import Search from './Search'

const Header = () => {
	const { handleSearcher } = useProjects()
	
	return (
		<header className='px-4 py-5 bg-white border-b'>
			<div className='md:flex md:justify-between'>
				<h2 className='text-4xl text-sky-600 font-black mb-5 md:mb-0'>UpTask</h2>

				<div className='flex flex-col md:flex-row items-center gap-4'>
					<button
						type='button'
						className='font-bold uppercase'
						onClick={handleSearcher}
					>
						Search Project
					</button>

					<Link className='font-bold uppercase' to='/projects'>
						Projects
					</Link>

					<button
						type='button'
						className='text-white bg-sky-600 text-sm p-3 rounded-md uppercase font-bold'
					>
						Logout
					</button>

					<Search />
				</div>
			</div>
		</header>
	)
}

export default Header
