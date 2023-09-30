import axios from 'axios'

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-Requested-With": "XMLHttpRequest",
};

const Axios = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}/api`,
	headers
})

export default Axios