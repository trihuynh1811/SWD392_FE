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
    // const register = (e) => {
    //     if (Object.entries(formik.errors).length !== 0) {
    //         return
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

    console.log(accessToken);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        fullname: "",
        phone: "",
        role: 0
    });
    const [error, setError] = useState("");

    const validateSchema = Yup.object().shape({
        email: Yup.string().email("Please enter a valid email").required("This field is required"),
        password: Yup.string()
                .required("This field is required")
                .min(8, "Pasword must be 8 or more characters")
                .matches(/(?=.*[A-Z])\w+/, "Password must contain at least one uppercase letter")
                .matches(/(?=.*[a-z])\w+/, "Password must contain at least one lowercase letter")
                .matches(/\d/, "Password must contain at least one number"),
        fullname: Yup.string().required("This field is required"),
        phone: Yup.string()
                .required('This field is required')
                .matches(/^[0-9]{10,11}$/, 'Invalid phone number'),
        role: Yup.number()
                .required('This field is required')
                .integer()
                .min(2)
                .max(3)
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            fullname: "",
            phone: "",
            role: 0
        },
        validationSchema: validateSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
        },
    });


    useEffect(() => {
        console.log("email: " + data.email);
        console.log("password: " + data.password);
        console.log("fullname: " + data.fullname);
        console.log("phone: " + data.phone);
        console.log("role: " + data.role);
    }, [data])

    const handleInput = (e) => {
        setData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    // minh: check r sua ham register gium t
    const register = () => {
        if (Object.entries(formik.errors).length !== 0) {
            return;
        };
        UserApi.Register(data).then(res => {
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
                <div className="w-[50%] flex justify-center">
                    <div className="p-6">
                        <h1 className="register_title text-center text-[56px] leading-tight tracking-tight text-[#3D4449] md:text-[56px] mb-[30px]">
                            Sign up to ProAs
                        </h1>
                        <div className='text-red-500'>{error}</div>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div className="flex items-center">
                                <div className="w-[48%] justify-center">
                                    <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                    <input
                                        type='text'
                                        name='fullname'
                                        id='fullname'
                                        className="border border-[#3D4449] border-opacity-25 h-[50px] text-gray-900 text-[16px]  rounded-[10px] focus:ring-primary-600 focus:border-[#3D4449] block w-full p-2.5 focus:outline-none dark:focus:ring-blue-500 dark:focus:border-[#3D4449]"
                                        value={data.fullname} onChange={e => { formik.handleChange(e); handleInput(e) }}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.fullname && formik.errors.fullname && (
                                        <div className='flex-1 flex items-center mt-2 text-red-500 italic text-sm'>{formik.errors.fullname}</div>
                                    )}
                                </div>
                                <div className="w-[4%] justify-center">
                                </div>
                                <div className="w-[48%] justify-center">
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
                                    <input
                                        type='text'
                                        name='phone'
                                        id='phone'
                                        className="border border-[#3D4449] border-opacity-25 h-[50px] text-gray-900 text-[16px]  rounded-[10px] focus:ring-primary-600 focus:border-[#3D4449] block w-full p-2.5 focus:outline-none dark:focus:ring-blue-500 dark:focus:border-[#3D4449]"
                                        value={data.phone} onChange={e => { formik.handleChange(e); handleInput(e) }}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.phone && formik.errors.phone && (
                                        <div className='flex-1 flex items-center mt-2 text-red-500 italic text-sm'>{formik.errors.phone}</div>
                                    )}
                                </div>
                            </div>
                            <div className='mt-[70px]'>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
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
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
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
                            <div>
                                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">Role</label>
                                <select
                                    name='role'
                                    id='role'
                                    className="border mb-[10px] border-[#3D4449] border-opacity-25 h-[50px] text-gray-900 text-[16px]  rounded-[10px] focus:ring-primary-600 focus:border-[#3D4449] block w-full p-2.5 focus:outline-none dark:focus:ring-blue-500 dark:focus:border-[#3D4449]"
                                    value={data.role}
                                    onChange={e => { formik.handleChange(e); handleInput(e) }}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value={0} hidden>Choose a role</option>
                                    <option value={2}>Audience</option>
                                    <option value={3}>Creator</option>
                                </select>
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