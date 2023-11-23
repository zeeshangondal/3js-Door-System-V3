import React from 'react';

export default function LabelWithRange({ label, number, setNumber ,range}) {

    // Styles
    const activeStyle = {
        cursor: 'pointer',
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '5px',
        // border: 'none',
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
            <div className="mt-2" >
                <h6>{label}</h6>
                <div>
                    <div className="d-flex">
                        {range.map((n, index) => (
                            <div
                                key={n}
                                style={{
                                    ...((number === n ? activeStyle : defaultStyle)),
                                    ...(index === 0
                                        ? {
                                            border: '1px solid rgb(156, 163, 175)',
                                            borderRadius: '10px 0px 0px 10px',
                                        }
                                        : {}),
                                    ...(index === range.length - 1
                                        ? {
                                            border: '1px solid rgb(156, 163, 175)',
                                            borderRadius: '0px 10px 10px 0px',
                                        }
                                        : {}),
                                    ...(index > 0 && index < range.length - 1
                                        ? {
                                            border: '1px solid rgb(156, 163, 175)',
                                        }
                                        : {}),
                                    ...(index === range.length - 2
                                        ? {
                                            borderWidth: '1px 0px',
                                            borderStyle: 'solid',
                                            borderColor: 'rgb(156, 163, 175)',
                                        }
                                        : {}),
                                    ...(index === 0
                                        ? {
                                            borderWidth: '1px 1px 1px 0px',
                                            borderStyle: 'solid',
                                            borderColor: 'rgb(156, 163, 175)',
                                            borderRadius: '10px 0px 0px 10px',
                                        }
                                        : {}),
                                }}
                                onClick={() => setNumber(n)}
                                className={`px-3 py-2 ${
                                    index === 0 ? 'left-round-style' : ''
                                } ${index === range.length - 1 ? 'right-round-style' : ''}`}
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
