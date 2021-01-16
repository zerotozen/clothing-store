import React from 'react';
import Signin from '../../components/signin/signin.component';
import SignUp from '../../components/sign-up/sign-up.component'

import './signin-signup.styles.scss';

const SigningSignUpPage = () =>{
    return(
        <div className='sign-in-and-sign-up'>
            <Signin/>
            <SignUp/>
        </div>
    )
}

export default SigningSignUpPage;