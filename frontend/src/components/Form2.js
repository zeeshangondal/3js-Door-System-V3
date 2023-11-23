import React, { useEffect, useState } from 'react';
import BackNextComp from './BackNextComp';
import ToggleSwitch from './ToggleSwitch';
import LabelWithInput from './LabelWithInput';



function Form2(props) {
    let { doorSpecs, setDoorSpecs,
    } = props


    function setLeftPanelWidth(Width) {
        setDoorSpecs(pre => {
            return {
                ...pre,
                leftPanel: {
                    ...pre.leftPanel,
                    width: Width
                }
            }
        })
    }
    function setRightPanelWidth(Width) {
        setDoorSpecs(pre => {
            return {
                ...pre,
                rightPanel: {
                    ...pre.rightPanel,
                    width: Width
                }
            }
        })
    }
    function setTopPanelLength(Length) {
        setDoorSpecs(pre => {
            return {
                ...pre,
                topPanel: {
                    ...pre.topPanel,
                    length: Length
                }
            }
        })
    }
    function setBottomSteelPanelLength(Length) {
        setDoorSpecs(pre => {
            return {
                ...pre,
                bottomSteelPanel: {
                    ...pre.bottomSteelPanel,
                    length: Length
                }
            }
        })
    }
    function filpTopPanelInclude() {
        if (doorSpecs.topPanel.include) {
            setTopPanelLength(0)
        } else {
            setTopPanelLength(200)
        }
        setDoorSpecs(pre => {
            return {
                ...pre,
                topPanel: {
                    ...pre.topPanel,
                    include: !pre.topPanel.include
                }
            }
        })
    }
    function filpBottomSteelPanelInclude() {
        if (doorSpecs.bottomSteelPanel.include) {
            setBottomSteelPanelLength(0)
        } else {
            setBottomSteelPanelLength(300)
        }

        setDoorSpecs(pre => {
            return {
                ...pre,
                bottomSteelPanel: {
                    ...pre.bottomSteelPanel,
                    include: !pre.bottomSteelPanel.include
                }
            }
        })
    }

    function handlePanelLengthAutoFixing() {
        if (doorSpecs.panelTypePosition === 1) {
            setLeftPanelWidth(0)
            setRightPanelWidth(0)
        }
        if (doorSpecs.panelTypePosition === 2) {
            if (doorSpecs.leftPanel.width === 0)
                setLeftPanelWidth(400)
            setRightPanelWidth(0)
        }
        if (doorSpecs.panelTypePosition === 3) {
            if (doorSpecs.rightPanel.width === 0)
                setRightPanelWidth(400)

            setLeftPanelWidth(0)
        }
        if (doorSpecs.panelTypePosition === 4) {
            if (doorSpecs.leftPanel.width === 0)
                setLeftPanelWidth(400)
            if (doorSpecs.rightPanel.width === 0)
                setRightPanelWidth(400)


        }
        if (doorSpecs.doorType === 3) {
            setLeftPanelWidth(0)
            setRightPanelWidth(0)
            setTopPanelLength(0)
            setDoorSpecs(pre => {
                return { ...pre, topPanel: { ...pre.topPanel, include: false } }
            })
        }
    }

    useEffect(() => {
        handlePanelLengthAutoFixing()
    }, [doorSpecs.panelTypePosition, doorSpecs.doorType])

    function setPanelTypePosition(newPosition) {
        setDoorSpecs(pre => {
            return { ...pre, panelTypePosition: newPosition }
        })
    }


    return (
        <div className='col-11' >
            <div>
                <h1 style={{ fontWeight: 'bold' }}>Panels</h1>
            </div>
            {doorSpecs.doorType === 3 ?
                <i><small style={{ fontWeight: 'normal' }}>A sliding door cannot be mounted on a side or top panel. However, extra fixed panels can be installed. Please contact our sales department to discuss further possibilities</small></i>
                :
                <div>
                    <div className='mt-3'>
                        <b><h5>Zig Panels</h5></b>
                    </div>
                    <div className='mt-2'>
                        <h6>Position</h6>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div
                                className={`col-6 d-flex justify-content-center align-items-center ${doorSpecs.panelTypePosition === 1 ? 'black-background-white-text' : 'form2-grid-hover'
                                    }`}
                                onClick={() => setPanelTypePosition(1)}
                                style={{
                                    border: '1px solid #9CA3AF',
                                    height: '6vh',
                                    borderTopLeftRadius: '10px',
                                    borderBottomLeftRadius: '0px',
                                    borderBottomRightRadius: '0px',
                                    borderTopRightRadius: '0px',
                                    cursor: 'pointer',
                                }}
                            >
                                Geen
                            </div>
                            <div
                                className={`col-6 d-flex  justify-content-center align-items-center ${doorSpecs.panelTypePosition === 2 ? 'black-background-white-text' : 'form2-grid-hover'
                                    }`}
                                onClick={() => setPanelTypePosition(2)}
                                style={{
                                    border: '1px solid #9CA3AF',
                                    height: '6vh',
                                    borderTopLeftRadius: '0px',
                                    borderBottomLeftRadius: '0px',
                                    borderBottomRightRadius: '0px',
                                    borderTopRightRadius: '10px',
                                    cursor: 'pointer',
                                }}
                            >
                                Links
                            </div>
                        </div>
                        <div className="row">
                            <div
                                className={`col-6 d-flex justify-content-center align-items-center ${doorSpecs.panelTypePosition === 3 ? 'black-background-white-text' : 'form2-grid-hover'
                                    }`}
                                onClick={() => setPanelTypePosition(3)}
                                style={{
                                    border: '1px solid #9CA3AF',
                                    height: '6vh',
                                    borderTopLeftRadius: '0px',
                                    borderBottomLeftRadius: '10px',
                                    borderBottomRightRadius: '0px',
                                    borderTopRightRadius: '0px',
                                    cursor: 'pointer',
                                }}
                            >
                                Rechts
                            </div>
                            <div
                                className={`col-6 d-flex justify-content-center align-items-center ${doorSpecs.panelTypePosition === 4 ? 'black-background-white-text' : 'form2-grid-hover'
                                    }`}
                                onClick={() => setPanelTypePosition(4)}
                                style={{
                                    border: '1px solid #9CA3AF',
                                    height: '6vh',
                                    borderTopLeftRadius: '0px',
                                    borderBottomLeftRadius: '0px',
                                    borderBottomRightRadius: '10px',
                                    borderTopRightRadius: '0px',
                                    cursor: 'pointer',
                                }}
                            >
                                Beide
                            </div>
                        </div>
                    </div>


                    {doorSpecs.panelTypePosition === 2 || doorSpecs.panelTypePosition === 4 ?
                        <div className='mt-2'>
                            <LabelWithInput label="Left side panel width" value={doorSpecs.leftPanel.width} setValue={setLeftPanelWidth} />
                        </div>
                        :
                        ''}
                    {doorSpecs.panelTypePosition === 3 || doorSpecs.panelTypePosition === 4 ?
                        <div className='mt-2'>
                            <LabelWithInput label="Right side panel width" value={doorSpecs.rightPanel.width} setValue={setRightPanelWidth} />
                        </div>
                        :
                        ''}
                    <div className='mt-4'>
                        <b><h5>Top Panel</h5></b>
                        <ToggleSwitch isOn={doorSpecs.topPanel.include} onToggle={() => filpTopPanelInclude()} />
                        {doorSpecs.topPanel.include ?
                            <LabelWithInput label="Length" value={doorSpecs.topPanel.length} setValue={setTopPanelLength} />
                            : ''}
                    </div>
                </div>
            }
            <div className='mt-3'>
                <b><h5>Bottom Steel Panel</h5></b>
                <ToggleSwitch isOn={doorSpecs.bottomSteelPanel.include} onToggle={() => filpBottomSteelPanelInclude()} />
                {doorSpecs.bottomSteelPanel.include ?
                    <LabelWithInput label="Length" value={doorSpecs.bottomSteelPanel.length} setValue={setBottomSteelPanelLength} />
                    : ''}

            </div>

        </div>
    );
}

export default Form2;
