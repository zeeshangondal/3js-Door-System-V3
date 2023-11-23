import React, { useEffect, useState } from 'react';
import BackNextComp from './BackNextComp';
import ToggleSwitch from './ToggleSwitch';
import LabelWithInput from './LabelWithInput';
import LabelWithRange from './LabelWithRange';



function Form2(props) {
    let { handleGoBack, handleGoNext, doorSpecs, setDoorSpecs } = props
    function setNumberOfDoorHBars(number){
        setDoorSpecs(pre=>{
            return {...pre, numberOfHBars:number}
        })
    }
    function setNumberOfDoorVBars(number){
        setDoorSpecs(pre=>{
            return {...pre, numberOfVBars:number}
        })
    }
    function setNumberOfTopPanelHBars(number){
        setDoorSpecs(pre=>{
            return {...pre, topPanel:{...pre.topPanel, numberOfHBars:number}}
        })
    }
    function setNumberOfTopPanelVBars(number){
        setDoorSpecs(pre=>{
            return {...pre, topPanel:{...pre.topPanel, numberOfVBars:number}}
        })
    }
    function setNumberOfLeftRightPanelHBars(number){
        setDoorSpecs(pre=>{
            return {...pre, leftRightPanelHBars:number}
        })
    }
    function setNumberOfLeftRightPanelVBars(number){
        setDoorSpecs(pre=>{
            return {...pre, leftRightPanelVBars:number}
        })
    }
    
    
        
    return (
        <div className='col-11' >
            <div>
                <h1 style={{ fontWeight: 'bold' }}>Panel Divisoin</h1>
            </div>
            <i><small style={{ fontWeight: 'normal' }}>You can change the position of the panel division by dragging the transoms and mullions on the 3D model.</small></i>

            <div>
                <div className='mt-3'>
                    <b><h5>Door</h5></b>
                    <LabelWithRange label="Liggers" number={doorSpecs.numberOfHBars}   setNumber={setNumberOfDoorHBars}  range={[0, 1, 2, 3, 4]} />
                    <LabelWithRange label="Staanders" number={doorSpecs.numberOfVBars} setNumber={setNumberOfDoorVBars} range={[0, 1, 2, 3, 4]} />
                </div>
                {doorSpecs.leftPanel.width > 0 || doorSpecs.rightPanel.width > 0 ?
                    <div className='mt-3'>
                        <b><h5>Zig Panel</h5></b>
                        <LabelWithRange label="Liggers" number={doorSpecs.leftRightPanelHBars} setNumber={setNumberOfLeftRightPanelHBars} range={[0, 1, 2, 3, 4]} />
                        <LabelWithRange label="Staanders" number={doorSpecs.leftRightPanelVBars} setNumber={setNumberOfLeftRightPanelVBars} range={[0, 1, 2, 3, 4]} />
                    </div>
                    : ''}
                {doorSpecs.topPanel.include && doorSpecs.topPanel.length>0 ?
                    <div className='mt-3'>
                        <b><h5>Top Panel</h5></b>
                        <LabelWithRange label="Liggers" number={doorSpecs.topPanel.numberOfHBars} setNumber={setNumberOfTopPanelHBars} range={[0, 1, 2, 3, 4]} />
                        <LabelWithRange label="Staanders" number={doorSpecs.topPanel.numberOfVBars} setNumber={setNumberOfTopPanelVBars} range={[0, 1, 2, 3, 4]} />
                    </div>
                    : ''}

            </div>

            <div>
                <BackNextComp middleLabel="3/4" onGoBack={handleGoBack} onGoNext={handleGoNext}  />
            </div>
        </div>
    );
}

export default Form2;
