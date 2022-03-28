import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthProvider';

import axios from '../../api/axios';
const LOGIN_URL = '/auth/login';

const LoginForm = () => {

	const { setAuth } = useContext(AuthContext);
	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState('');
	const [password, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

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
				{ username:user, password:password }
			);
			console.log(response?.data?.token);

			/* 			const accessToken = response?.data?.accessToken;
						const roles = response?.data?.roles; */
			setAuth({ user, password })
			setUser('');
			setPwd('');
			setSuccess(true);
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

		<>
			{success ? (
				<section>
					<h1>You are logged in!</h1>
					<br />
					<p>
						<a href="#">Go to Home</a>
					</p>
				</section>
			) : (
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
								<div class="mb-6">
									<label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
									<input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
										type="password"
										id="password"
										placeholder="******************"
										onChange={(e) => setPwd(e.target.value)}
										value={password}
										required
									/>
								</div>
								<div class="flex items-center justify-between">
									<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
										Sign In
									</button>
								</div>
							</div>

						</form>
					</div>

				</section>
			)}
		</>

	)
}

export default LoginForm