import React from 'react';

const Navigation = ({onRouteChange, isSignedIn})=>{
    if(isSignedIn)return (
        <nav>
            <p onClick={()=>onRouteChange('signout')}
            className='f4 link dim pa4 white pointer'>Sign out</p>
        </nav>
    );else return(
        <nav style={{display:'flex'}}>
            <p onClick={()=>onRouteChange('signin')}
            className='f4 link dim pa4 white pointer'>Sign in</p>
            <p onClick={()=>onRouteChange('register')}
            className='f4 link dim pa4 white pointer'>Register</p>
        </nav>
    );
};
export default Navigation;