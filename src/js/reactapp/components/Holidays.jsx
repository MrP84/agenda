import React from 'react'

import RenderFr from "./RenderFr";

const Holidays = ({support}) => {

    return (
            <div className='holiday'>
                <RenderFr dateFormat={'H'} support={support}/>
            </div>
        )


}

export default Holidays