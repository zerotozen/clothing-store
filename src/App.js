import React from 'react';
import { Switch,  Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header-component/header.component';
import SigninSignupPage from './pages/signin-signup/signin-signup.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import setCurrentUser from './redux/user/user.actions';
import { toggleCartHidden } from './redux/cart/cart.action';

class App extends React.Component{
  unsubscribeFromAuth = null;

 

  componentDidMount(){
    const { setCurrentUser } =this.props;
    this.unsubscribeFromAuth= auth.onAuthStateChanged(async userAuth =>{
     // console.log('esto es userAuth', userAuth)
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(onSnapshot =>{
          setCurrentUser({
            currentUser:{
              id: onSnapshot.id,
              ...onSnapshot.data()
            }
          });
          //muestra por consola el estado
          //() =>{
          //console.log('USUARIO ACTUAL',this.state)
          //}
          
        });
        
      }else{
        setCurrentUser(userAuth)
      }
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }


  render(){
    const { hideCartDropdown } = this.props
    return (
      <div>
        <Header/>
        <Switch hideCartDropdown={hideCartDropdown}>
          <Route exact={true} path='/' component = {HomePage} hideCartDropdown={hideCartDropdown} />
          <Route exact={true} path='/shop' component = {ShopPage} hideCartDropdown={hideCartDropdown}/>
          <Route 
            exact={true} 
            path='/signin' 
            render={()=>
              this.props.currentUser ?(
              <Redirect to='/'/>
              ) : (
              <SigninSignupPage/>
              )
            }
          />
        </Switch>
      </div>
    );
    }
  
}

const mapStateToProps = (state) =>({
  currentUser: state.user.currentUser,
  cartState:state.cartState

})


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => {dispatch(setCurrentUser(user))},
  hideCartDropdown: () => {dispatch(toggleCartHidden(false))}
});                                 

export default connect(mapStateToProps, mapDispatchToProps)(App);
