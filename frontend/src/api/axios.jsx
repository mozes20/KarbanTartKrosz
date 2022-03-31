import axios from "axios";

export default axios.create({
	baseURL: 'http://168.119.57.253:5001/auth'
})