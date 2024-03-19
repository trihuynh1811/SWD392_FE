import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ArtworkApi, TagApi } from '../api/Api';
import { useFormik } from "formik";
import * as Yup from "yup";
import '../dist/output.css';
import { useSelector } from 'react-redux';
import PreviewFile from '../components/PreviewFile';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { WithContext as ReactTags } from 'react-tag-input';


function CreateArtwork() {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const artworkTypes = useSelector((state) => state.artworkType.artworkTypes)

    const [artworkTypesList, setArtworkTypesList] = useState([])
    console.log(accessToken)
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken === null) {
            navigate('/Login')
            return
        }
        window.scrollTo(0, 0)
        console.log(artworkTypes)
        setArtworkTypesList(artworkTypes)
        TagApi.GetAllTags().then((res) => {
            const tagList = res.data.map((tag, index) => {
                return {
                    id: tag.name,
                    text: tag.name
                };
            });
            setSuggestions(tagList);
        })
    }, [])

    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        Price: 0,
        TypeId: 1,
        ArtworkStatus: 'Available',
        ImageUploadRequest: [],
        Tags: []
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
        Name: Yup.string().required("This field is required"),
        Description: Yup.string().required("This field is required"),
        Price: Yup.number()
            .required('Price is required')
            .positive('Price must be a positive number')
            .min(10000, 'Price must be at least 10000')
            .max(1000000000, 'Price must be at most 1000000000'),
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
            Name: "",
            Description: "",
            Price: 0,
            ImageUploadRequest: ""
        },
        validationSchema: validateSchema,
    });

    const handleInput = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.name === 'TypeId' ? parseInt(e.target.value) : e.target.value,
        }))
    }

    const discard = () => {
        navigate("/manage-artwork")
    }

    const renderListOfArtworkType = artworkTypesList.map((artworkType, index) => (
        <option key={artworkType.id} value={artworkType.id}>{artworkType.name}</option>
    ))

    const submitNewArtwork = async () => {
        if (Object.entries(formik.errors).length !== 0) {
            return;
        }
        formData.Tags = tags.map((tag, index) => tag.text);
        console.log(formData);
        ArtworkApi.CreateArtwork(accessToken, formData).then(res => {
            if (res.status === 200) {
                alert("new artwork created");
                navigate('/manage-artwork');
            }
        }).catch(e => console.log(e))
    }

    // Start tag related section
    const [suggestions, setSuggestions] = useState([]);

    const KeyCodes = {
        comma: 188,
        enter: 13
    };

    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const [tags, setTags] = useState([]);

    const handleTagDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleTagAddition = tag => {
        setTags([...tags, tag]);
        console.log(tags);
    };

    const handleTagDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    };

    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };
    // End tag related section

    return (
        <>
            <Header></Header>
            <div id="createProductModal" tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden flex z-50 justify-center items-center w-full h-full bg-[#F4F1E4]" style={{ minHeight: "100vh" }}>
                <div className="relative p-4 w-full h-full">
                    <div className="relative p-4 bg-white rounded-lg shadow">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900">New Artwork</h3>
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
                                    <div className='flex justify-between items-center'>
                                        <label htmlFor="Tags" className="block mb-2 text-sm font-medium text-gray-900">Tags</label>
                                    </div>
                                    <ReactTags
                                        classNames={{
                                            tag: 'bg-red-300 text-gray-900 text-sm rounded-lg inline-block mb-[5px] mr-[5px] p-2.5',
                                            tags: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5',
                                            remove: 'w-[20px] text-[18px]',
                                            suggestions: 'absolute bg-red-300 text-gray-900 text-sm rounded-lg block p-2.5'
                                        }}
                                        id='tags'
                                        name='tags'
                                        tags={tags}
                                        suggestions={suggestions}
                                        delimiters={delimiters}
                                        handleDelete={handleTagDelete}
                                        handleAddition={handleTagAddition}
                                        handleDrag={handleTagDrag}
                                        handleTagClick={handleTagClick}
                                        inputFieldPosition="bottom"
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
                            <div className="mb-4">
                                <div className='flex justify-between items-center'>
                                    <span className="block mb-2 text-sm font-medium text-gray-900">Product Images</span>
                                    {formik.values["ImageUploadRequest"] && formik.errors.ImageUploadRequest && (
                                        <div className='flex-1 flex items-center ms-3 mb-2 text-red-500 italic text-sm'>{formik.errors.ImageUploadRequest}</div>
                                    )}
                                </div>
                                <div className="uploadImage flex justify-center items-center w-full">

                                    <label htmlFor="file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer">
                                        <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                            <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span>
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, WEBP, JPEG, GIF</p>
                                        </div>
                                        <input
                                            id="file"
                                            name="ImageUploadRequest"
                                            className="hidden"
                                            type="file"
                                            accept={getAllowedExt("file")}
                                            onChange={(event) => {
                                                formik.setFieldValue("ImageUploadRequest", event.currentTarget.files[0]);
                                                handleInput(event)
                                            }}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.values["ImageUploadRequest"] ? (
                                            <PreviewFile file={formik.values["ImageUploadRequest"]}
                                                height={`${document.querySelector('.uploadImage').offsetHeight}px`}
                                                width={`${document.querySelector('.uploadImage').offsetWidth}px`}
                                                className={'preview object-contain'}
                                                displayPosition={'absolute'}
                                            />
                                        ) : null}
                                    </label>
                                </div>
                            </div>
                            <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                                <button type="button" className="w-full justify-center text-black inline-flex items-center bg-white hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-blue-600 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10" onClick={submitNewArtwork}>Add product</button>
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

export default CreateArtwork