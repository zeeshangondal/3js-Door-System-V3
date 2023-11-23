import React from 'react'

export default function LabelWithRange({label, number,setNumber, range}) {
        // Styles
        const activeStyle = {
            cursor: 'pointer',
            backgroundColor: '#1f2937',
            color: 'white',
            padding: '5px',
            border: 'none',
        };
    
        const defaultStyle = {
            cursor: 'pointer',
            backgroundColor: 'white',
            color: 'black',
            padding: '5px',
            border: 'none',
        };
    
    

    return (
        <div>
            <div className='mt-2'>
                <h6>{label}</h6>
                <div>
                    <div className="d-flex" >
                        {range.map((n,index) => (
                            <div
                                key={n}
                                style={number === n ? activeStyle : defaultStyle}
                                onClick={() => setNumber(n)}
                                className={`px-3 py-2 ${index === 0 ? 'left-round-style' : ''} ${index === range.length-1 ? 'right-round-style' : ''}`}
                            >
                                {n}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
