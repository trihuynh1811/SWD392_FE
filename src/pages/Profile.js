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
import { HeaderOutSide } from '../components/header/Header_outside';
import '../css/app.css';

function Profile() {
    const currentUser = useSelector((state) => state.currentUser.user)
    const accessToken = useSelector((state) => state.auth.accessToken)
    const [personalInfo, setPersonalInfo] = useState(null);
    const [data, setData] = useState({
        Phone: "",
        Address: "",
        ImageUploadRequest: ""
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
        if (Object.entries(formik.errors).length !== 0) {
            return
        }
        UserApi.UpdateAccountDetail(accessToken, formik.values, currentUser.userId).then(res => {
            if (res.status === 204) {
                alert("update profile successfully")
            }
        }).catch(e => console.error(e))
    }

    return (
        <div className='bg-[#F4F1E4]'>
            <HeaderOutSide></HeaderOutSide>
            <h1 className='profile_title text-[40px] pl-[30px] text-[#3D4449]'>Account Information</h1>
            <div className='bg-transparent flex justify-center items-center px-4 py-4'>

                {
                    personalInfo ? (
                        <div className='profile bg-transparent flex justify-center gap-[50px] px-4 py-4 rounded-lg w-full'>
                            <div className='uploadImage border border-[#888888] rounded-[20px] border-opacity-30 w-[420px] h-[544px] flex flex-col justify-center items-center'>
                                {formik.values["ImageUploadRequest"] ? (
                                    <PreviewFile
                                        file={formik.values["ImageUploadRequest"]}
                                        height={''}
                                        width={''}
                                        className={'w-full h-full max-w-full max-h-full object-cover rounded-lg border-2 border-black'}
                                        displayPosition={'w-full h-full'}
                                    />
                                ) : (
                                    <img src={personalInfo.imagePath !== null ? personalInfo.imagePath : avatar} alt='profile' className='w-[300px] h-[300px] object-cover border-[1px] mt-[10px] mb-[38px] rounded-full border-gray-400' />



                                )}
                                {/*  */}
                                <div className=''>
                                    <div className='flex hover:bg-black transition-all items-center gap-[5px] px-[20px] py-[8px] rounded-[5px] cursor-pointer bg-[#F8939C]'>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                <path d="M2.5 6C2.5 4.93913 2.92143 3.92172 3.67157 3.17157C4.42172 2.42143 5.43913 2 6.5 2H18.5C19.5609 2 20.5783 2.42143 21.3284 3.17157C22.0786 3.92172 22.5 4.93913 22.5 6V18C22.5 19.0609 22.0786 20.0783 21.3284 20.8284C20.5783 21.5786 19.5609 22 18.5 22H6.5C5.43913 22 4.42172 21.5786 3.67157 20.8284C2.92143 20.0783 2.5 19.0609 2.5 18V6Z" stroke="#F4F1E4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M9 11C10.3807 11 11.5 9.88071 11.5 8.5C11.5 7.11929 10.3807 6 9 6C7.61929 6 6.5 7.11929 6.5 8.5C6.5 9.88071 7.61929 11 9 11Z" stroke="#F4F1E4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M15.026 12.6211L6.5 22.0001H18.633C19.6586 22.0001 20.6422 21.5926 21.3674 20.8674C22.0926 20.1422 22.5 19.1586 22.5 18.1331V18.0001C22.5 17.5341 22.325 17.3551 22.01 17.0101L17.98 12.6151C17.7922 12.4102 17.5637 12.2467 17.3092 12.135C17.0546 12.0234 16.7796 11.966 16.5017 11.9666C16.2237 11.9671 15.949 12.0256 15.6949 12.1383C15.4408 12.251 15.213 12.4154 15.026 12.6211Z" stroke="#F4F1E4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                        <label htmlFor='file' className=' text-[#F4F1E4] 
                                        text-[18px] 
                                        font-normal 
                                        cursor-pointer  '>
                                            Change
                                        </label>
                                    </div>

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

                            <div className='w-[900px] border rounded-[20px] border-[#888888] border-opacity-30 flex flex-col justify-center px-6 py-3'>
                                <div className='w-full flex flex-col mb-2'>
                                    <div className='text-[#A67E4E] font-bold text-[23px] mb-[8px]'>
                                        Email
                                    </div>
                                    <div className='w-full border-[1px] opacity-50 rounded-lg border-[#3D4449] px-4 py-3'>
                                        {personalInfo.email}
                                    </div>
                                </div>
                                <div className='w-full flex flex-col mb-2'>
                                    <div className='text-[#A67E4E] font-bold text-[23px] mb-[8px]'>
                                        Name
                                    </div>
                                    <div className='w-full border-[1px] opacity-50 rounded-lg border-[#3D4449] px-4 py-3'>
                                        {personalInfo.fullName}
                                    </div>
                                </div>
                                <div className='w-full flex flex-col mb-2'>
                                    <div className='flex'>
                                        <div className='text-[#A67E4E] font-bold text-[23px] mb-[8px]'>Phone</div>
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
                                        className='w-full bg-transparent border-[1px] rounded-lg border-[#3D4449] px-2 py-3'
                                        value={formik.values.Phone}
                                    />
                                </div>
                                <div className='w-full flex flex-col mb-2'>
                                    <div className='flex'>
                                        <div className='text-[#A67E4E] font-bold text-[23px] mb-[8px]'>Address</div>
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
                                        className='w-full bg-transparent border-[1px] rounded-lg border-[#3D4449] px-2 py-3'
                                        value={formik.values.Address}
                                    />
                                </div>
                                <div className='flex justify-center gap-[80px] pt-[20px]'>
                                    <button className='px-4 py-2 rounded-lg w-[185px] h-[45px] bg-[#40A737] 
                                    text-white text-[18px] font-medium
                                    hover:bg-[#358a2d]
                                    transition-all' onClick={editProfile}>
                                        Save
                                    </button>
                                    <button className='px-4 py-2 text-[18px] font-medium text-[#3D4449] bg-[#FFD586] rounded-lg w-[185px] h-[45px] hover:bg-[#e2b561]'>
                                        <Link to={"/"}>
                                            Cancel
                                        </Link>

                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )
                }
            </div>

            <Footer></Footer>
        </div>
    )
}

export default Profile