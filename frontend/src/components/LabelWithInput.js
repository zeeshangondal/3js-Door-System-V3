import React from 'react'

export default function LabelWithInput({label,value,setValue}) {
    return (
        <div className='d-flex flex-column mt-1' >
            <h6>{label}</h6>
            <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className='form-control mt-1' style={{ borderRadius: '7px', width: "95%", marginTop:"-1vh" }} />
        </div>)
}
