import React from 'react';

const ImageLinkForm = ({onInputChange,onSubmit})=>{
    return(
        <div>
            <p className='f4 pa3 white'>This robot detects celebrity faces</p>
            <div className='pa4 br3 shadow-5'>
                <input className='f4 pa2 w-60' type='text' onChange={onInputChange}/>
                <button className='w-20 pointer grow f4 link ph3 pv2 dib black bg-gold'
                onClick={onSubmit}>Detect</button>
            </div>
        </div>
    );
};
export default ImageLinkForm;