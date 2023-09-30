import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<header className='px-4 py-5 bg-white border-b'>
			<div className='md:flex md:justify-between'>
				<h2 className='text-4xl text-sky-600 font-black'>UpTask</h2>
				<input type="search"
					placeholder='Search Project'
					className='rounded-lg lg:w-96 block p-2 border'
				/>

				<div className='flex items-center gap-4'>
					<Link className='font-bold uppercase' to='/projects'>
						Projects
					</Link>

					<button
						type='button'
						className='text-white bg-sky-600 text-sm p-3 rounded-md uppercase font-bold'
					>
						Logout
					</button>
				</div>
			</div>
		</header>
	)
}

export default Header
