import React, { useEffect, useState } from 'react';
import doorType1SVG from '../SVGs/type1.svg'
import doorType2SVG from '../SVGs/type2.svg'
import doorType3SVG from '../SVGs/type3.svg'
import doorType4SVG from '../SVGs/type4.svg'
import ToggleSwitch from './ToggleSwitch';
import LabelWithRangeFrom1 from './LabelWithRangeForm1';




function Form1(props) {
    let { doorSpecs, setDoorSpecs, handleLengthChange, handleWidthChange, handleNumberOfDoorsChange} = props
    const doorTypeImages = [doorType1SVG, doorType2SVG, doorType3SVG, doorType4SVG]
    const [showingNumberOfDoors, setShowingNumberOfDoors] = useState([1, 2, 3, 4])
    const [isHovered, setIsHovered] = useState(0);

    useEffect(() => {
        if (doorSpecs.doorType === 3) {
            setShowingNumberOfDoors([1, 2])
            if (doorSpecs.numberOfDoors > 2) {
                handleNumberOfDoorsChange(2)
            }
        } else {
            setShowingNumberOfDoors([1, 2, 3, 4])
        }

    }, [doorSpecs.doorType])

    function handleDoorTypeChange(typeNumber) {
        if (typeNumber == 3) {
            setDoorSpecs(pre => {
                return {
                    ...pre, doorType: typeNumber,
                    leftPanel: { ...pre.leftPanel, width: 0 },
                    rightPanel: { ...pre.rightPanel, width: 0 },
                    panelTypePosition: 1,
                    topPanel: { ...pre.topPanel, include: false, length: 0 }
                }
            })
        } else {
            setDoorSpecs(pre => {
                return {
                    ...pre, doorType: typeNumber,
                }
            })
        }
    }
    function getHoverTextFor(type) {
        if (type == 1)
            return "Scharnierdeur"
        if (type == 2)
            return "Pivotdeur"
        if (type == 3)
            return "Schuifdeur"
        if (type == 4)
            return "Vast Paneel"

    }
    
    return (
        <div className='col-11'>
            <div>
                <h1 style={{ fontWeight: 'bold' }}>Deur</h1>
            </div>
            <div className='mt-4'>
                <p>Door Type</p>
            </div>
            <div className='container'>
                {/* #dee2e6 */}
                <div className="row">
                    {/* Grids */}
                    {doorTypeImages.map((img, index) => (
                        <div
                            key={index}
                            className="col-3 grid-hover grid-hover-hover col-5 shadow1 m-1  d-flex align-items-center justify-content-center"
                            style={{ background: 'white', borderBottom: (index + 1 === doorSpecs.doorType ? '4px solid black' : ''), height: '13vh', borderRadius: "10%", marginBottom: "3px" }}
                            onClick={() => handleDoorTypeChange(index + 1)} // Passes the corresponding grid number to setDoorType
                            onMouseEnter={() => setIsHovered(index + 1)}
                            onMouseLeave={() => setIsHovered(0)}
                        >
                            {isHovered === index + 1 ?
                                <h6 style={{color:'white', fontWeight:'normal'}}>{getHoverTextFor(index + 1)}</h6>
                            :
                            <img width="110%" src={img} alt="My SVG Image" />
                            }
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div className='mt-1'>
                    <p>Afmetingen</p>
                    <div className='d-flex'>
                        <div className='d-flex flex-column' style={{ fontWeight: "normal" }}>
                            <small>Lengte</small>
                            <input type="number" value={doorSpecs.length} onChange={(e) => handleLengthChange(e.target.value)} className='form-control mt-1' style={{ borderRadius: '7px', width: "95%" }} />
                        </div>
                        <div className='d-flex flex-column' style={{ fontWeight: "normal" }}>
                            <small>Breedte</small>
                            <input type="number" value={doorSpecs.width} onChange={(e) => handleWidthChange(e.target.value)} className='form-control mt-1' style={{ borderRadius: '7px', width: "95%" }} />
                        </div>
                    </div>
                </div>
            </div>
            <div >
                <LabelWithRangeFrom1 range={showingNumberOfDoors} label="Aantal" number={doorSpecs.numberOfDoors} setNumber={handleNumberOfDoorsChange} />
            </div>

            <div>
                <div className='mt-2'>
                    <p>Draairichting</p>
                    <div className='d-flex align-items-center' style={{ fontWeight: 'normal', marginTop: '-10px' }}>
                        <small>Left</small>
                        <div className='m-2'>
                            <ToggleSwitch isOn={doorSpecs.doorHandleDirection} onToggle={() => setDoorSpecs(pre => { return { ...pre, doorHandleDirection: !pre.doorHandleDirection } })} />
                        </div>
                        <small>Right</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form1;
