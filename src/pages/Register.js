// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import { useFormik } from "formik";
// import { UserApi } from '../api/Api';
// import * as Yup from "yup";
// import '../dist/output.css';
// import { useSelector } from 'react-redux';

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserApi } from '../api/Api';
import { useFormik } from "formik";
import * as Yup from "yup";
import '../dist/output.css';
import '../css/Login-Register/Register.css';
import register_img from '../image/LoginSignUp/Register_Img.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from '../store/authActions';
import { setCurrentUser } from '../store/userActions';
import jwt_decode from "jwt-decode";

function Register() {
    // const [data, setData] = useState({
    //     username: "",
    //     firstname: "",
    //     lastname: "",
    //     email: "",
    //     password: "",
    //     phoneNumber: "",
    //     address: ""
    // })

    // useEffect(() => {
    //     console.log(data)
    // })

    // const validateSchema = Yup.object().shape({
    //     username: Yup.string().required("This field is required"),
    //     firstname: Yup.string().required("This field is required"),
    //     lastname: Yup.string().required("This field is required"),
    //     email: Yup.string().email("Please enter a valid email").required("This field is required"),
    //     password: Yup.string()
    //         .required("This field is required")
    //         .min(8, "Pasword must be 8 or more characters")
    //         .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
    //         .matches(/\d/, "Password should contain at least one number")
    //         .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
    //     phoneNumber: Yup.string().matches(/^[0-9]{10,11}$/, 'Invalid phone number').required('This field is required'),
    //     address: Yup.string().required("This field is required")
    // });

    // const formik = useFormik({
    //     initialValues: {
    //         username: "",
    //         firstname: "",
    //         lastname: "",
    //         email: "",
    //         password: "",
    //         phoneNumber: "",
    //         address: ""
    //     },
    //     validationSchema: validateSchema,
    //     onSubmit: (values, { resetForm }) => {
    //         console.log(values);
    //     },
    // });

    // const handleInput = (e) => {
    //     console.log(e.target.value)
    //     setData(prevState => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value
    //     }))
    // }

    // const register = (e) => {
    //     if (Object.entries(formik.errors).length !== 0) {
    //         return
    //     }
    //     let dataToSend = {
    //         ...data,
    //         FullName: `${data.firstname}_${data.lastname}`
    //     }
    //     UserApi.Register(dataToSend).then(res => {
    //         console.log(res.data)
    //         alert(res.data)

    //         if (res.status === 200) {
    //             setTimeout(() => {
    //                 navigate("/login")
    //             }, 3000)
    //         }
    //     })

    // }

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

    const register = () => {
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
        // <section className="bg-gray-50">
        //     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        //         <div className="w-1/2 bg-white rounded-lg shadow dark:border dark:border-gray-700">
        //             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        //                 <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
        //                     Sign up
        //                 </h1>
        //                 <form className="space-y-4" action="#" onSubmit={formik.handleSubmit}>

        //                     <div className='flex justify-between items-center'>
        //                         <div style={{ flex: .47 }}>
        //                             <div className='flex justify-between mb-2 items-center'>
        //                                 <label htmlFor="firstname" className="block text-sm font-medium text-gray-900">First Name</label>
        //                                 {formik.touched.firstname && formik.errors.firstname && (
        //                                     <div className='flex-1 flex items-center ms-3 text-red-500 italic text-sm'>{formik.errors.firstname}</div>
        //                                 )}
        //                             </div>
        //                             <input
        //                                 type="text"
        //                                 id="firstname"
        //                                 name="firstname"
        //                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //                                 onChange={e => { formik.handleChange(e); handleInput(e) }}
        //                                 onBlur={formik.handleBlur}
        //                                 value={formik.values.firstname}
        //                             />
        //                         </div>

        //                         <div style={{ flex: .47 }}>
        //                             <div className='flex justify-between mb-2 items-center'>
        //                                 <label htmlFor="lastname" className="block text-sm font-medium text-gray-900">Last Name</label>
        //                                 {formik.touched.lastname && formik.errors.lastname && (
        //                                     <div className='flex-1 flex items-center ms-3 text-red-500 italic text-sm'>{formik.errors.lastname}</div>
        //                                 )}
        //                             </div>
        //                             <input
        //                                 type="text"
        //                                 id="lastname"
        //                                 name="lastname"
        //                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //                                 onChange={e => { formik.handleChange(e); handleInput(e) }}
        //                                 onBlur={formik.handleBlur}
        //                                 value={formik.values.lastname}
        //                             />
        //                         </div>
        //                     </div>

        //                     <div className='flex justify-between items-center'>
        //                         <div style={{ flex: .47 }}>
        //                             <div className='flex justify-between mb-2 items-center'>
        //                                 <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
        //                                 {formik.touched.email && formik.errors.email && (
        //                                     <div className='flex-1 flex items-center ms-3 text-red-500 italic text-sm'>{formik.errors.email}</div>
        //                                 )}
        //                             </div>
        //                             <input
        //                                 type="email"
        //                                 id="email"
        //                                 name="email"
        //                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //                                 onChange={e => { formik.handleChange(e); handleInput(e) }}
        //                                 onBlur={formik.handleBlur}
        //                                 value={formik.values.email}
        //                             />

        //                         </div>

        //                         <div style={{ flex: .47 }}>
        //                             <div className='flex justify-between mb-2 items-center'>
        //                                 <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-900">Phone Number</label>
        //                                 {formik.touched.phoneNumber && formik.errors.phoneNumber && (
        //                                     <div className='flex-1 flex items-center ms-3 text-red-500 italic text-sm'>{formik.errors.phoneNumber}</div>
        //                                 )}
        //                             </div>
        //                             <input
        //                                 type="text"
        //                                 id="phoneNumber"
        //                                 name="phoneNumber"
        //                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //                                 onChange={e => { formik.handleChange(e); handleInput(e) }}
        //                                 onBlur={formik.handleBlur}
        //                                 value={formik.values.phoneNumber}
        //                             />

        //                         </div>
        //                     </div>

        //                     <div className='flex justify-between items-center'>
        //                         <div style={{ flex: .47 }}>
        //                             <div className='flex justify-between mb-2 items-center'>
        //                                 <label htmlFor="username" className="block text-sm font-medium text-gray-900">Username</label>
        //                                 {formik.touched.username && formik.errors.username && (
        //                                     <div className='flex-1 flex items-center ms-3 text-red-500 italic text-sm'>{formik.errors.username}</div>
        //                                 )}
        //                             </div>
        //                             <input
        //                                 type="text"
        //                                 id="username"
        //                                 name="username"
        //                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //                                 onChange={e => { formik.handleChange(e); handleInput(e) }}
        //                                 onBlur={formik.handleBlur}
        //                                 value={formik.values.username}
        //                             />
        //                         </div>

        //                         <div style={{ flex: .47 }}>
        //                             <div className='flex justify-between mb-2 items-center'>
        //                                 <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
        //                                 {formik.touched.password && formik.errors.password && (
        //                                     <div className='flex-1 flex items-center ms-3 text-red-500 italic text-sm'>{formik.errors.password}</div>
        //                                 )}
        //                             </div>
        //                             <input
        //                                 type="password"
        //                                 id="password"
        //                                 name="password"
        //                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //                                 onChange={e => { formik.handleChange(e); handleInput(e) }}
        //                                 onBlur={formik.handleBlur}
        //                                 value={formik.values.password}
        //                             />
        //                         </div>
        //                     </div>

        //                     <div>
        //                         <div className='flex justify-between mb-2 items-center'>
        //                             <label htmlFor="address" className="block text-sm font-medium text-gray-900">Address</label>
        //                             {formik.touched.address && formik.errors.address && (
        //                                 <div className='flex-1 flex items-center ms-3 text-red-500 italic text-sm'>{formik.errors.address}</div>
        //                             )}
        //                         </div>
        //                         <input
        //                             type="text"
        //                             id="address"
        //                             name="address"
        //                             className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //                             onChange={e => { formik.handleChange(e); handleInput(e) }}
        //                             onBlur={formik.handleBlur}
        //                             value={formik.values.address}
        //                         />
        //                     </div>

        //                     <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={register}>Sign up</button>
        //                     <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        //                         Already have an account? <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" to={"/Login"}>Login</Link>
        //                     </p>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // </section>
        <section className="">
            <div className="flex items-center py-8 md:h-screen lg:py-0">
                <div className="w-[50%] flex justify-center">
                    <div className="p-6">
                        <h1 className="register_title text-center text-[56px] leading-tight tracking-tight text-[#3D4449] md:text-[56px] mb-[30px]">
                            Sign up to ProAs
                        </h1>
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

                            <button type='button' className="login_btn w-full text-[#F4F1E4] bg-[#000000] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-[50px] text-[19px] px-5 py-[15px] text-center dark:bg-primary-600 dark:hover:bg-[#F8939C] dark:focus:ring-primary-800 mb-[20px]" onClick={register}>Create Account</button>
                            <p className=" text-sm text-center font-light text-[#3D4449] dark:text-gray-400">
                                Already have an account? <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" to={"/Login"}>Sign In</Link>
                            </p>
                        </form>
                    </div>
                </div>
                <div className='w-[50%] h-[100vh]'>
                    <img className='object-cover w-full h-full' src={register_img} alt='' />
                </div>
            </div>
        </section>
    )
}

export default Register