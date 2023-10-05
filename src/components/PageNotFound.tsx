import { Link } from 'react-router-dom'

const PageNotFound = () => {
	return (
		<div className='flex flex-col h-screen w-full justify-center items-center'>
			<p className='text-slate-600 text-4xl mb-5'>Page Not Found</p>
			<Link
				className='text-sky-600 hover:text-sky-700'
				to='/'
			>
				Back to home
			</Link>
		</div>
	)
}

export default PageNotFound
