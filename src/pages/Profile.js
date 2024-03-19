import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { UserApi } from '../api/Api';
import '../dist/output.css';
import '../css/Artwork/detail.css';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import avatar from '../image/Header/Avatar.webp'
import PreviewFile from '../components/PreviewFile';

function Profile() {
    const currentUser = useSelector((state) => state.currentUser.user)
    const accessToken = useSelector((state) => state.auth.accessToken)
    const [personalInfo, setPersonalInfo] = useState(null);
    const [data, setData] = useState({
        Phone: "",
        Address: "",
        ImagePath: ""
    })

    const validFileExtensions = { file: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

    function isValidFileType(fileName, fileType) {
        return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
    }

    function getAllowedExt(type) {
        return validFileExtensions[type].map((e) => `.${e}`).toString()
    }

    const MAX_FILE_SIZE = 102400000000;

    const validateSchema = Yup.object().shape({
        Phone: Yup.string()
            .required('This field is required')
            .matches(/^[0-9]{10,11}$/, 'Invalid phone number'),
        Address: Yup.string()
            .required('This field is required'),
        ImageUploadRequest: Yup
            .mixed()
            .required("Required")
            .test("is-valid-type", "Not a valid image type",
                value => isValidFileType(value && value.name.toLowerCase(), "file"))
            .test("is-valid-size", "Max allowed size is 1GB",
                value => value && value.size <= MAX_FILE_SIZE)
    });

    const formik = useFormik({
        initialValues: {
            Phone: "",
            Address: "",
            ImageUploadRequest: ""
        },
        validationSchema: validateSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
        },
    });

    useEffect(() => {
        UserApi.ViewAccountDetail(currentUser.userId).then(res => {
            console.log(res.data)
            setPersonalInfo(res.data)
            formik.values.Phone = res.data.phone
            formik.values.Address = res.data.address
            formik.values.ImageUploadRequest = res.data.imagePath
            console.log(formik.values.ImageUploadRequest)
        }).catch(e => console.error(e))
    }, [])

    const handleInput = (e) => {
        setData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value
        }))
    }

    const editProfile = () => {
        console.log(formik.values)
        console.log(data)
        UserApi.UpdateAccountDetail(accessToken, data, currentUser.userId).then(res => {
            if (res.status === 204) {
                alert("update profile successfully")
            }
        }).catch(e => console.error(e))
    }

    return (
        <>
            <Header></Header>
            <div className='bg-[#F4F1E4] flex justify-center items-center px-4 py-4' style={{ minHeight: '100vh' }}>
                {
                    personalInfo ? (
                        <div className='bg-white flex px-4 py-4 h-3/4 rounded-lg w-full'>
                            <div className='uploadImage w-1/4 h-full flex flex-col justify-center items-center'>
                                {formik.values["ImageUploadRequest"] ? (
                                    <PreviewFile
                                        file={formik.values["ImageUploadRequest"]}
                                        height={''}
                                        width={''}
                                        className={'w-full h-full max-w-full max-h-full object-cover rounded-lg border-2 border-black'}
                                        displayPosition={'w-full h-full'}
                                    />
                                ) : (
                                    <img src={avatar} alt='profile' className='w-full h-[90%] object-cover rounded-lg border-2 border-black' />

                                )}
                                <div className=''>
                                    <label htmlFor='file' className='my-2 px-4 py-2 text-white rounded-lg bg-blue-400'>change profile image</label>
                                    <input
                                        id='file'
                                        className='hidden'
                                        name='ImageUploadRequest'
                                        accept={getAllowedExt("file")}
                                        type='file'
                                        onChange={(event) => {
                                            formik.setFieldValue("ImageUploadRequest", event.currentTarget.files[0]);
                                            handleInput(event)
                                        }}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                {formik.values["ImageUploadRequest"] && formik.errors.ImageUploadRequest && (
                                    <div className='flex-1 flex items-center ms-3 mb-2 text-red-500 italic text-sm'>{formik.errors.ImageUploadRequest}</div>
                                )}
                            </div>

                            <div className='w-3/4 flex flex-col px-2 py-3'>
                                <div className='w-full flex flex-col mb-2'>
                                    <div className=''>
                                        Email
                                    </div>
                                    <div className='w-full border-2 rounded-lg border-black px-2 py-3'>
                                        {personalInfo.email}
                                    </div>
                                </div>
                                <div className='w-full flex flex-col mb-2'>
                                    <div className=''>
                                        Name
                                    </div>
                                    <div className='w-full border-2 rounded-lg border-black px-2 py-3'>
                                        {personalInfo.fullName}
                                    </div>
                                </div>
                                <div className='w-full flex flex-col mb-2'>
                                    <div className='flex'>
                                        <div>Phone</div>
                                        {formik.touched.Phone && formik.errors.Phone && (
                                            <div className='flex-1 flex items-center ms-2 text-red-500 italic text-sm'>{formik.errors.Phone}</div>
                                        )}
                                    </div>
                                    <input
                                        type='text'
                                        name='Phone'
                                        id='Phone'
                                        onChange={e => { formik.handleChange(e); handleInput(e) }}
                                        onBlur={formik.handleBlur}
                                        className='w-full border-2 rounded-lg border-black px-2 py-3'
                                        value={formik.values.Phone}
                                    />
                                </div>
                                <div className='w-full flex flex-col mb-2'>
                                    <div className='flex'>
                                        <div>Address</div>
                                        {formik.touched.Address && formik.errors.Address && (
                                            <div className='flex-1 flex items-center ms-2 text-red-500 italic text-sm'>{formik.errors.Address}</div>
                                        )}
                                    </div>
                                    <input
                                        type='text'
                                        name='Address'
                                        id='Address'
                                        onChange={e => { formik.handleChange(e); handleInput(e) }}
                                        onBlur={formik.handleBlur}
                                        className='w-full border-2 rounded-lg border-black px-2 py-3'
                                        value={formik.values.Address}
                                    />
                                </div>
                                <div className='flex justify-end'>
                                    <button className='px-4 py-2 border-2 rounded-lg border-blue-500 hover:bg-blue-500' onClick={editProfile}>Edit</button>
                                    <button className='px-4 py-2 border-2 rounded-lg border-red-500 hover:bg-red-500'>Cancel</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )
                }
            </div>

            <Footer></Footer>
        </>
    )
}

export default Profile