import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserApi } from '../api/Api';
import { useFormik } from "formik";
import * as Yup from "yup";
import '../dist/output.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from '../store/authActions';

const Login = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);

    console.log(accessToken)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState("")

    const validateSchema = Yup.object().shape({
        email: Yup.string().email("Please enter a valid email").required("This field is required"),
        password: Yup.string()
            .required("This field is required")
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: validateSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
        },
    });


    useEffect(() => {
        console.log("email: " + data.email)
        console.log("password: " + data.password)
    }, [data])

    const handleInput = (e) => {
        setData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const login = () => {
        UserApi.Login(data).then(res => {
            var token = res.data
            dispatch(setAccessToken(token));
            console.log(token)

            if (res.status === 200) {
                console.log(res.status);
                navigate("/")
            }

        }).catch(e => setError(e.response.data))
    }

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Login to your account
                        </h1>
                        <div className='text-red-500'>{error}</div>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <input type='text' name='email' id='email' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.email} onChange={e => handleInput(e)} />
                                {formik.touched.email && formik.errors.email && (
                                    <div className='flex-1 flex items-center ms-3 text-red-500 italic text-sm'>{formik.errors.email}</div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input type='password' name='password' id='password' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.password} onChange={e => handleInput(e)} />
                                {formik.touched.password && formik.errors.password && (
                                    <div className='flex-1 flex items-center ms-3 text-red-500 italic text-sm'>{formik.errors.password}</div>
                                )}
                            </div>
                            <div className="flex items-center justify-between">
                                <Link className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500" to={"#"}>Forgot password?</Link>
                            </div>
                            <button type='button' className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={login}>Login</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account? <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" to={"/Register"}>Register</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>


    )
}

export default Login