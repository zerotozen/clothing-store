import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import './header.styles.scss';

const Header = ({currentUser,cartState}) =>{
    return(
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo'>

                </Logo>
            </Link>
            <div className='options'>
                <Link className='option' to='/shop'>
                    SHOP
                </Link>
                <Link className='contact' to='/contact'>
                    CONTACT
                </Link>
                {
                    currentUser ? 
                    <div className='option' onClick={()=>auth.signOut()}>
                        SIGN OUT
                    </div>
                    :
                    <Link className='option' to='/signin'>
                        SIGN IN
                    </Link>
                   
                }
                 <CartIcon/>
            </div>

           { cartState ? null : <CartDropdown/>}
        </div>
    
    );
}

const mapStateToProps = state => ({
        currentUser: state.user.currentUser,
        cartState:state.cart.hidden
})


export default connect(mapStateToProps)(Header);