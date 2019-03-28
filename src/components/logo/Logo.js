import React from 'react';
import Tilt from 'react-tilt';
import logo from './logo2.png';

const Logo = ()=>{
    return(
    <div >
        <Tilt className="Tilt" options={{ max : 70,scale:1.2 }} style={{ height: 200, width: 200 }} >
            <div className="Tilt-inner pa4"> 
                <img alt='logo' style={{width:'6em',height:'6em'}} src={logo}/>
            </div>
        </Tilt>
    </div>
    );
};
export default Logo;