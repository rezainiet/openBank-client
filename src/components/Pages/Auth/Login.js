import React, { useState } from 'react';
import { useAuthState, useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';

const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [
        signInWithEmailAndPassword,
        eUser,
        eLoading,
        emailError,
    ] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');

    let from = location.state?.from?.pathname || "/";

    let signInErrorMessage;

    if (error || gError || emailError) {
        signInErrorMessage = error?.message || gError?.message || emailError?.message;
    };


    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
    };

    if (eUser || user || gUser) {
        navigate(from, { replace: true });
    }

    const handlePasswordReset = (event) => {
        navigate('/reset-password');
    }

    return (
        <>
            <div className="grid items-center h-screen justify-items-center text-white mt-10 bg-gradient-to-l from-sky-500 to-blue-500 py-10 lg:px-10 md:px-5 sm:px-3">
                <div className="card w-96 bg-sky-300 border border-gray-200 bg-opacity-60 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Login!</h2>


                        <form onSubmit={handleSubmit(onSubmit)}>


                            <div className="form-control w-full max-w-xs">
                                <div>
                                    <label className="label">
                                        <span className="label-text text-gray-200">Your Email <span className='text-orange-500'>*</span></span>
                                    </label>
                                    <input {...register("email", { required: true })} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Your email" className="bg-sky-200 text-gray-700 input input-bordered w-full max-w-xs" />
                                    <label className="label">
                                        {errors.email && <span className="label-text-alt text-warning">Email is required</span>}

                                    </label>
                                </div>


                                <div>
                                    <label className="label">
                                        <span className="label-text text-gray-200">Your Password <span className='text-orange-500'>*</span></span>
                                    </label>
                                    <input {...register("password", { required: true })} type="text" placeholder="Your password" className="bg-sky-200 text-gray-700 input input-bordered w-full max-w-xs" />
                                    <small><p className='text-secondary link link-hover' onClick={handlePasswordReset}>Reset Password</p></small>
                                    <label className="label">
                                        {errors.password && <span className="label-text-alt text-warning">Password is required</span>}

                                    </label>
                                </div>
                            </div>
                            <p className="text-red-500 text-xs">{signInErrorMessage}</p>
                            <input type="submit" className='btn btn-accent w-full max-w-xs' value='login' />
                            <p className='mt-3'><small>Don't have an account? <Link to='/register' className='text-secondary'>Please Register</Link></small></p>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Login;