import React from 'react';
import './FaceRec.css';

const faceRec = ({box,url,celebrity})=>{
    return(
        <div>
            <p className='f4 white'>{celebrity}</p>
            <div className='center ma'>                          
                <div className='absolute mt2'>
                    <img id='inputimage' src={url} alt='' width='500px' height='auto'/>
                    <div className='bounding-box' 
                    style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
                    </div>
                </div>           
            </div>
        </div>
    );
};
export default faceRec;