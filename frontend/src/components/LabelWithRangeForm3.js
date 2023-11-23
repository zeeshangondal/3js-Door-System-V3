import React from 'react';

export default function LabelWithRangeForm3({ label, number, setNumber, range }) {
    // Styles
    const activeStyles = [
        {
            cursor: 'pointer',
            backgroundColor: '#1f2937',
            color: 'white',
            padding: '5px',
            border: '1px solid rgb(156, 163, 175)',
            borderRadius: '10px 0px 0px 10px',
        },
        {
            cursor: 'pointer',
            backgroundColor: '#1f2937',
            color: 'white',
            padding: '5px',
            border: '1px solid rgb(156, 163, 175)',
            borderWidth: '1px 1px 1px 0px',
            borderStyle: 'solid',
            borderColor: 'rgb(156, 163, 175)',
        },
        {
            cursor: 'pointer',
            backgroundColor: '#1f2937',
            color: 'white',
            padding: '5px',
            border: '1px solid rgb(156, 163, 175)',
            borderWidth: '1px 1px 1px 0px',
            borderStyle: 'solid',
            borderColor: 'rgb(156, 163, 175)',
        },
        {
            cursor: 'pointer',
            backgroundColor: '#1f2937',
            color: 'white',
            padding: '5px',
            border: '1px solid rgb(156, 163, 175)',
            borderWidth: '1px 0px',
            borderStyle: 'solid',
            borderColor: 'rgb(156, 163, 175)',
        },
        {
            cursor: 'pointer',
            backgroundColor: '#1f2937',
            color: 'white',
            padding: '5px',
            border: '1px solid rgb(156, 163, 175)',
            borderRadius: '0px 10px 10px 0px',
        },
    ];

    const defaultStyle = {
        cursor: 'pointer',
        backgroundColor: 'white',
        color: 'black',
        padding: '5px',
        // border: 'none',
    };

    return (
        <div>
            <div className='mt-2'>
                <h6>{label}</h6>
                <div>
                    <div className="d-flex">
                        {range.map((n, index) => (
                            <div
                                key={n}
                                style={number === n ? activeStyles[index] : defaultStyle}
                                onClick={() => setNumber(n)}
                                className={`px-3 py-2`}
                            >
                                {n}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
