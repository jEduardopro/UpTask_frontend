import axios from "axios"

const handleError = (error: unknown): string => {
	if (axios.isAxiosError(error)) {
		return error.response?.data?.message || error.message
	}
	
	if (error instanceof Error) {
		return error.message
	}


	return "Unexpected error, contact support"
}

export default handleError
