import React from 'react'
import Matrix from './Matrix'

/*

this components creates a backdrop with the matrix effect

**/

export default function Backdrop(){
    const streamCount = Math.floor(window.innerWidth /26);
    return (
        <div className='brightness-50 fixed top-0 left-0 bottom-0 right-0 flex'>
        {new Array(streamCount).fill(0).map(item =>
            <Matrix />    
        )}   
        </div>
    )
}