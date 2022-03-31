import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react'
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../../api/axios';
const LOGIN_URL = '/login';

const Login = () => {

	const { setAuth } = useAuth();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";
	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState('');
	const [password, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');

	useEffect(() => {
		userRef.current.focus();
	}, [])

	useEffect(() => {
		setErrMsg('');
	}, [user, password])

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(LOGIN_URL,
				{ username: user, password: password }
			);
			console.log(response?.data?.token);
			const token = response?.data?.token;
			localStorage.setItem('token', token);
			console.log(response?.data)
			const response2 = await axios.get('/maincategory',
				{ params: {token:token} }
			);
			console.log(response2?.data)
			/* 			
						const roles = response?.data?.roles; */
			setAuth({ user, password, token });
			setUser('');
			setPwd('');
			navigate(from, { replace: true });
		} catch (error) {
			if (!error?.respone) {
				setErrMsg('Nop server response');
			} else if (error.response?.status === 400) {
				setErrMsg('Missing Username or Password');
			} else if (error.response?.status === 401) {
				setErrMsg('Unauthorized');
			} else {
				setErrMsg('Login Failed');
			}
			errRef.current.focus();
		}
	}

	return (

		<section >
			<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
			<h1 className='md:flex md:justify-center mt-10 text-white'>Sign In</h1>

			<div className='md:flex md:justify-center mt-4'>
				<form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
					<div className='mb-4'>
						<label htmlFor="username" className='block text-gray-700 text-sm font-bold mb-2'>Username:</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							type="text"
							id="username"
							placeholder="Username"
							ref={userRef}
							autoComplete="off"
							onChange={(e) => setUser(e.target.value)}
							value={user}
							required
						/>
						<div className="mb-6">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
							<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
								type="password"
								id="password"
								placeholder="Password"
								onChange={(e) => setPwd(e.target.value)}
								value={password}
								required
							/>
						</div>
						<div className="flex items-center justify-between">
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
								Sign In
							</button>
						</div>
					</div>

				</form>
			</div>
		</section>


	)
}

export default Login