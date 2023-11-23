import React, { useEffect, useState } from 'react';
import BackNextComp from './BackNextComp';
import ToggleSwitch from './ToggleSwitch';
import LabelWithInput from './LabelWithInput';
import ColorfulCircle from './ColorfulCircle';
import CircularImage from './CircularImage';
import ColorDropdown from './ColorDropdown';



function Form4(props) {
    let { doorSpecs, setDoorSpecs, handleGoBack, handleGoNext, backgroundGradient } = props
    function setFrameColor(color) {
        setDoorSpecs(pre => {
            return {
                ...pre,
                frameColor: color
            }
        })
    }
    function setGlassColor(color) {
        setDoorSpecs(pre => {
            return {
                ...pre,
                glassColor: color
            }
        })
    }


    function handleColorCodeChange(code) {
        let colorCode = code
        if (code[0] != '#') {
            colorCode = '#' + code
        }
        setFrameColor(colorCode)
    }

    function handleGlassColorCodeChange(code) {
        handleGlassTexture('')
        setGlassColor(code)
    }
    function handleGlassTexture(glassTexture) {
        setGlassColor('')
        setDoorSpecs(pre => {
            return {
                ...pre,
                textureImage: glassTexture,
            }
        })
    }




    return (
        <div className='col-11' >
            <div>
                <h1 style={{ fontWeight: 'bold' }}>Frame</h1>
            </div>

            <div className='mt-1'>
                <b><h5>Basic Colors</h5></b>
                <div className='d-flex row' >
                    <ColorfulCircle color="#0A0A0A" size="45px" setColor={setFrameColor} chosenColor={doorSpecs.frameColor} />
                    <ColorfulCircle color="#F4F4F4" size="45px" setColor={setFrameColor} chosenColor={doorSpecs.frameColor} />
                </div>
            </div>


            <div className='mt-1'>
                <b><h5>Popular Colors</h5></b>
                <div className='d-flex justify-content-between' >
                    <ColorfulCircle color="#293133" size="45px" setColor={setFrameColor} chosenColor={doorSpecs.frameColor} />                 
                    <ColorfulCircle color="#20603D" size="45px" setColor={setFrameColor} chosenColor={doorSpecs.frameColor} />

                    <ColorfulCircle color="#763C28" size="45px" setColor={setFrameColor} chosenColor={doorSpecs.frameColor} />
                    <ColorfulCircle color="#AEA04B" size="45px" setColor={setFrameColor} chosenColor={doorSpecs.frameColor} />
                </div>
            </div>

            <div className='mt-1'>
                <b><h5>Custom Color</h5></b>
                <div>
                    <div className='d-flex flex-column mt-1' >
                        <h6>RAL Color Code</h6>
                        {/* <input type="text" value={doorSpecs.frameColor} onChange={(e) => handleColorCodeChange(e.target.value)} className='form-control mt-1' style={{ borderRadius: '7px', width: "95%", marginTop: "-1vh" }} /> */}
                        <ColorDropdown chosenColor={doorSpecs.frameColor} setChosenColor={setFrameColor}/>
                    </div>
                </div>
            </div>


            <div className='mt-2'>
                <b><h5>Glass Types</h5></b>
                <div className='container'>
                    <div className='row' >
                        <div className="col-3"><CircularImage size="6vh" glassType="10" label="Transparent" textureValue="#959ca8" clickedTextureValue={doorSpecs.glassColor} onClick={() => { handleGlassColorCodeChange("#959ca8") }} /></div>
                        <div className="col-3"><CircularImage size="6vh" glassType="2" label="Flutes" textureValue="fluted.png" clickedTextureValue={doorSpecs.textureImage} onClick={() => { handleGlassTexture("fluted.png") }} /></div>
                        <div className="col-3"><CircularImage size="6vh" glassType="3" label="Listral D" textureValue="listral.jpg" clickedTextureValue={doorSpecs.textureImage} onClick={() => { handleGlassTexture("listral.jpg") }} /></div>
                        <div className="col-3"><CircularImage size="6vh" glassType="4" label="Kathderaal Max" textureValue="cathedral.jpg" clickedTextureValue={doorSpecs.textureImage} onClick={() => { handleGlassTexture("cathedral.jpg") }} /></div>
                    </div>
                    <div className='row' >
                        <div className="col-3"><CircularImage size="6vh" glassType="5" label="Visiosun" textureValue="steel-wire-color.png" clickedTextureValue={doorSpecs.textureImage} onClick={() => { handleGlassTexture("steel-wire-color.png") }} /></div>
                        <div className="col-3"><CircularImage size="6vh" glassType="6" label="Fume Grijis" textureValue="#4e5660" clickedTextureValue={doorSpecs.glassColor} onClick={() => { handleGlassColorCodeChange("#4e5660") }} /></div>
                        <div className="col-3"><CircularImage size="6vh" glassType="7" label="Fume Bruin" textureValue="#908377" clickedTextureValue={doorSpecs.glassColor} onClick={() => { handleGlassColorCodeChange("#908377") }} /></div>
                        <div className="col-3"><CircularImage size="6vh" glassType="8" label="Dark Gray" textureValue="#383c44" clickedTextureValue={doorSpecs.glassColor} onClick={() => { handleGlassColorCodeChange("#383c44") }} /></div>
                    </div>
                    <div className='row' >

                        <div className="col-3"><CircularImage size="6vh" glassType="9" label="Melk" textureValue="#979da2" clickedTextureValue={doorSpecs.glassColor} onClick={() => { handleGlassColorCodeChange("#979da2") }} /></div>
                        <div className="col-3"><CircularImage size="6vh" glassType="1" label="Staaldraad" textureValue="#868e97" clickedTextureValue={doorSpecs.glassColor} onClick={() => { handleGlassColorCodeChange("#868e97") }} /></div>
                        <div className="col-3"><CircularImage size="6vh" glassType="11" label="Black" textureValue="#070708" clickedTextureValue={doorSpecs.glassColor} onClick={() => { handleGlassColorCodeChange("#070708") }} /></div>
                        <div className="col-3"><CircularImage size="6vh" glassType="12" label="White" textureValue="#959ca8" clickedTextureValue={doorSpecs.glassColor} onClick={() => { handleGlassColorCodeChange("#959ca8") }} /></div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Form4;
