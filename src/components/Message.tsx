
type Props = {
	message: {
		error: boolean,
		text: string
	}
}

const Message = ({message}: Props) => {
	return (
		<div className={`${message.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600'}
			bg-gradient-to-br text-center p-3 rounded-xl capitalize text-white font-bold text-sm my-10
		`}>
			{message.text}
		</div>
	)
}

export default Message
