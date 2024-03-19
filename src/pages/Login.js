import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserApi } from '../api/Api';
import { useFormik } from "formik";
import * as Yup from "yup";
import '../dist/output.css';
import '../css/Login-Register/Login.css';
import login_img from '../image/LoginSignUp/Login_Img.png'
import google_icon from '../image/LoginSignUp/google_icon.png'
import line from '../image/LoginSignUp/line.png'
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from '../store/authActions';
import { setCurrentUser } from '../store/userActions';
import jwt_decode from "jwt-decode"

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
        if (Object.entries(formik.errors).length !== 0) {
            return
        }
        UserApi.Login(data).then(res => {
            var token = res.data
            var user = jwt_decode(token)
            console.log(user)
            dispatch(setCurrentUser(user))
            dispatch(setAccessToken(token));
            console.log(token)

            if (res.status === 200) {
                console.log(res.status);
                navigate("/")
            }

        }).catch(e => setError(e.response.data))
    }

    return (
        <section className="">
            <div className="flex items-center py-8 md:h-screen lg:py-0">
                <div className='w-[50%] h-[100vh]'>
                    <img className='object-cover w-full h-full' src={login_img} alt='' />
                </div>
                <div className="w-[50%] flex justify-center">
                    <div className="p-6">
                        <h1 className="login_title text-center text-[56px] leading-tight tracking-tight text-[#3D4449] md:text-[56px] mb-[30px]">
                            Sign in to ProAs
                        </h1>
                        <div className=' w-[380px] google_signin flex gap-[15px] justify-center items-center border rounded-[50px] py-[10px] border-[#3D4449] border-opacity-35 cursor-pointer'>
                            <img className='w-[28px] h-[28px]' src={google_icon} alt='google' />
                            <p>Sign in with Google</p>
                        </div>
                        <div className='mt-[10px] text-[14px] flex justify-center items-center gap-[8px] opacity-40'>
                            <img className='w-[80px] h-[0.5px]' src={line} alt='' />
                            <p>or sign in with email</p>
                            <img className='w-[80px] h-[0.5px]' src={line} alt='' />
                        </div>
                        <div className='text-red-500'>{error}</div>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div className='mt-[70px]'>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Username or email</label>
                                <input
                                    type='text'
                                    name='email'
                                    id='email'
                                    className="border border-[#3D4449] border-opacity-25 h-[50px] text-gray-900 text-[16px]  rounded-[10px] focus:ring-primary-600 focus:border-[#3D4449] block w-full p-2.5 focus:outline-none dark:focus:ring-blue-500 dark:focus:border-[#3D4449]"
                                    value={data.email} onChange={e => { formik.handleChange(e); handleInput(e) }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className='flex-1 flex items-center mt-2 text-red-500 italic text-sm'>{formik.errors.email}</div>
                                )}
                            </div>
                            <div>
                                <div className='mt-[30px] flex justify-between items-center'>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <div className="flex items-center justify-between">
                                        <Link className="underline mb-2 text-[13px] font-medium text-[#3D4449] opacity-60 hover:underline dark:text-primary-500" to={"#"}>Forgot your password?</Link>
                                    </div>
                                </div>

                                <input
                                    type='password'
                                    name='password'
                                    id='password'
                                    className="border mb-[10px] border-[#3D4449] border-opacity-25 h-[50px] text-gray-900 text-[16px]  rounded-[10px] focus:ring-primary-600 focus:border-[#3D4449] block w-full p-2.5 focus:outline-none dark:focus:ring-blue-500 dark:focus:border-[#3D4449]"
                                    value={data.password}
                                    onChange={e => { formik.handleChange(e); handleInput(e) }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <div className='flex-1 flex items-center mt-2 text-red-500 italic text-sm'>{formik.errors.password}</div>
                                )}
                            </div>

                            <button type='button' className="login_btn w-full text-[#F4F1E4] bg-[#F8939C] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-[50px] text-[19px] px-5 py-[15px] text-center dark:bg-primary-600 dark:hover:bg-[#000000] dark:focus:ring-primary-800 mb-[20px]" onClick={login}>Login</button>
                            <p className=" text-sm text-center font-light text-[#3D4449] dark:text-gray-400">
                                Don't have account? <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" to={"/Register"}>Sign Up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login