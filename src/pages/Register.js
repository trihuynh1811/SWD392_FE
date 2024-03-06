import React from 'react'
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import '../dist/output.css';

function Register() {
    const validateSchema = Yup.object().shape({
        username: Yup.string().required("This field is required"),
        firstname: Yup.string().required("This field is required"),
        lastname: Yup.string().required("This field is required"),
        email: Yup.string().email("Please enter a valid email").required("This field is required"),
        password: Yup.string()
            .required("This field is required")
            .min(8, "Pasword must be 8 or more characters")
            .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
            .matches(/\d/, "Password should contain at least one number")
            .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
        phoneNumber: Yup.string().matches(/^[0-9]{10,11}$/, 'Invalid phone number').required('This field is required'),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            phoneNumber: "",
        },
        validationSchema: validateSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
        },
    });

    return (
        <>
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-1/2 bg-white rounded-lg shadow dark:border dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
                                Sign up
                            </h1>
                            <form className="space-y-4" action="#" onSubmit={formik.handleSubmit}>
                                <div>
                                    <div className='flex justify-between mb-2 items-center'>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                                        {formik.touched.email && formik.errors.email && (
                                            <div className='flex-1 flex items-center ms-3 text-red-500 italic text-sm'>{formik.errors.email}</div>
                                        )}
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />

                                </div>

                                <div>
                                    <div className='flex justify-between mb-2 items-center'>
                                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-900">Phone Number</label>
                                        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                            <div className='flex-1 flex items-center ms-3 text-red-500 italic text-sm'>{formik.errors.phoneNumber}</div>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phoneNumber}
                                    />

                                </div>

                                <div>
                                    <div className='flex justify-between mb-2 items-center'>
                                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-900">First Name</label>
                                        {formik.touched.firstname && formik.errors.firstname && (
                                            <div className='flex-1 flex items-center ms-3 text-red-500 italic text-sm'>{formik.errors.firstname}</div>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        id="firstname"
                                        name="firstname"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.firstname}
                                    />
                                </div>

                                <div>
                                    <div className='flex justify-between mb-2 items-center'>
                                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-900">Last Name</label>
                                        {formik.touched.lastname && formik.errors.lastname && (
                                            <div className='flex-1 flex items-center ms-3 text-red-500 italic text-sm'>{formik.errors.lastname}</div>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        id="lastname"
                                        name="lastname"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.lastname}
                                    />
                                </div>

                                <div>

                                    <div className='flex justify-between mb-2 items-center'>
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-900">Username</label>
                                        {formik.touched.username && formik.errors.username && (
                                            <div className='flex-1 flex items-center ms-3 text-red-500 italic text-sm'>{formik.errors.username}</div>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.username}
                                    />
                                </div>

                                <div>
                                    <div className='flex justify-between mb-2 items-center'>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
                                        {formik.touched.password && formik.errors.password && (
                                            <div className='flex-1 flex items-center ms-3 text-red-500 italic text-sm'>{formik.errors.password}</div>
                                        )}
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                    />
                                </div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" to={"/Login"}>Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register