import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArtworkApi } from '../api/Api';
import { useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import '../dist/output.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from '../store/authActions';
import PreviewFile from '../components/PreviewFile';
import axios from 'axios';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';

function Gallery() {

    return (
        <>
            <Header></Header>
            <div style={{ minHeight: '100vh' }}>
                hello
            </div>
            <Footer></Footer>
        </>
    )
}

export default Gallery