import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArtworkApi } from '../api/Api';
import { useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import '../dist/output.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from '../store/authActions';
import PreviewFile from '../components/PreviewFile';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { HeaderOutSide } from '../components/header/Header_outside';

function EditArtwork() {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const artworkTypes = useSelector((state) => state.artworkType.artworkTypes)

    const [searchParams, setSearchParams] = useSearchParams();
    const [artworkTypesList, setArtworkTypesList] = useState([])
    const [id, setId] = useState(0)
    const [artwork, setArtwork] = useState(null)
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        Price: 0,
        TypeId: 1,
        IsDeleted: false
    })

    const navigate = useNavigate();
    console.log(searchParams.get("id"))

    const validateSchema = Yup.object().shape({
        Name: Yup.string().required("This field is required"),
        Description: Yup.string().required("This field is required"),
        Price: Yup.number()
            .required('Price is required')
            .positive('Price must be a positive number')
            .min(10000, 'Price must be at least 10000')
            .max(1000000000, 'Price must be at most 1000000000')
    });

    const formik = useFormik({
        initialValues: {
            Name: "",
            Description: "",
            Price: 0
        },
        validationSchema: validateSchema,
    });

    useEffect(() => {
        if (accessToken === null) {
            navigate('/login')
            return
        }
        window.scrollTo(0, 0)
        setArtworkTypesList(artworkTypes)
        ArtworkApi.GetArtworkById(searchParams.get("id")).then(res => {
            setArtwork(res.data)
            setId(searchParams.get("id"))
            formik.values.Name = res.data.name
            formData.Name = res.data.name
            formik.values.Description = res.data.description
            formData.Description = res.data.description
            formik.values.Price = res.data.price
            formData.Price = res.data.price
        }).catch(e => console.log(e))
    }, [])

    const discard = () => {
        navigate("/manage-artwork")
    }

    const handleInput = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.name === 'TypeId' ? parseInt(e.target.value) : e.target.value,
        }))
    }

    const updateArtwork = () => {
        if (Object.entries(formik.errors).length !== 0) {
            return;
        }
        ArtworkApi.UpdateArtworkById(id, formData, accessToken).then((res) => {
            if (res.status === 200) {
                alert(`Update artwork ${artwork.name} successfully`);
                navigate('/manage-artwork');
            }
        }).catch(e => console.log(e))
    }

    const renderListOfArtworkType = artworkTypesList.map((artworkType, index) => (
        <option key={artworkType.id} value={artworkType.id} selected={artwork !== null && artwork.typeId === artworkType.id}>{artworkType.name}</option>
    ))

    return (
        <>
            <HeaderOutSide></HeaderOutSide>
            <div id="createProductModal" tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden flex z-50 justify-center items-center w-full h-full bg-[#F4F1E4]" style={{ minHeight: "100vh" }}>
                <div className="relative p-4 w-full h-full">
                    <div className="relative p-4 bg-transparent rounded-lg shadow">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-[48px] font-bold text-gray-900">Edit Artwork</h3>
                        </div>
                        <form action="#">
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <div className='flex justify-between items-center'>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                        {formik.touched.Name && formik.errors.Name && (
                                            <div className='flex-1 flex items-center ms-3 mb-2 text-red-500 italic text-sm'>{formik.errors.Name}</div>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        name="Name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        onChange={e => { formik.handleChange(e); handleInput(e) }}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.Name}
                                    />

                                </div>


                                <div>
                                    <div className='flex justify-between items-center'>
                                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                                        {formik.touched.Price && formik.errors.Price && (
                                            <div className='flex-1 flex items-center ms-3 mb-2 text-red-500 italic text-sm'>{formik.errors.Price}</div>
                                        )}
                                    </div>
                                    <input
                                        type="number"
                                        name="Price"
                                        id="price"
                                        min={10000}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        onChange={e => { formik.handleChange(e); handleInput(e) }}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.Price}
                                    />

                                </div>

                                <div className='col-span-2'>
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Type</label>
                                    <select
                                        id="category"
                                        name='TypeId'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                        onChange={e => handleInput(e)}
                                    >
                                        {artworkTypesList.length > 0 && renderListOfArtworkType}
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <div className='flex justify-between items-center'>
                                        <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                        {formik.touched.Description && formik.errors.Description && (
                                            <div className='flex-1 flex items-center ms-3 mb-2 text-red-500 italic text-sm'>{formik.errors.Description}</div>
                                        )}
                                    </div>
                                    <textarea
                                        id="desc"
                                        name='Description'
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                                        onChange={e => { formik.handleChange(e); handleInput(e) }}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.Description}
                                    >

                                    </textarea>
                                </div>
                            </div>
                            <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                                <button type="button" className="w-full justify-center text-black inline-flex items-center bg-white hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-blue-600 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10" onClick={updateArtwork}>Update artwork</button>
                                <button data-modal-toggle="createProductModal" type="button" className="w-full justify-center text-black inline-flex items-center bg-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-red-600 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10" onClick={discard}>
                                    <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    Discard
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default EditArtwork