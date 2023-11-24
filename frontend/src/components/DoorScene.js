import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useThree, extend } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import { MeshPhysicalMaterial, DoubleSide, DirectionalLight, MeshStandardMaterial } from 'three';
import { TextureLoader, Box3, Vector3 } from 'three';
import listeralTexture from '../GlassTextures/listral.jpg'
import cathedralTexture from '../GlassTextures/cathedral.jpg'
import clearTexture from '../GlassTextures/clear.png'
import flutedTexture from '../GlassTextures/fluted.png'
import steelWireColorTexture from '../GlassTextures/steel-wire-color.png'
import DraggableBox from './DraggableBox'

import * as THREE from 'three';


// Extend the use of MeshPhysicalMaterial
extend({ MeshPhysicalMaterial, MeshStandardMaterial });

function DoorScene(props) {
    let { sWidth, sHeight, doorHandleVisible, doorSpecs, convertMmToDoorWidth, convertMmToDoorHeight, backgroundGradient,rendererRef } = props
    let { doorType, numberOfDoors, doorHandleDirection, frameColor, glassColor } = doorSpecs
    let [zoom, setZoom] = useState(0.5)
    const [texture, setTexture] = useState('')
    // const [allTextures,setAllTextures]= {"listral.jpg":'',"cathedral.jpg":'',"clear.png":'',"fluted.jpg":'',"steel-wire-color.png":''}


    function getTextureImage() {
        if (doorSpecs.textureImage == "listral.jpg") {
            return listeralTexture
        }
        if (doorSpecs.textureImage == "cathedral.jpg") {
            return cathedralTexture
        }
        if (doorSpecs.textureImage == "clear.png") {
            return clearTexture
        }
        if (doorSpecs.textureImage == "fluted.png") {
            return flutedTexture
        }
        if (doorSpecs.textureImage == "steel-wire-color.png") {
            return steelWireColorTexture
        }

    }

    useEffect(() => {
        if (doorSpecs.textureImage.length == 0)
            return;
        const textureLoader = new TextureLoader();
        textureLoader.load(
            getTextureImage(),
            function (texture) {
                const renderer = new THREE.WebGLRenderer();
                texture.encoding = THREE.sRGBEncoding;
                texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                // texture.repeat.set(90 * doorSpecs.numberOfDoors * doorSpecs.numberOfDoors, 90 * doorSpecs.numberOfDoors * doorSpecs.numberOfDoors); // This will repeat the texture 4 times on each axis
                texture.minFilter = THREE.NearestFilter;
                texture.magFilter = THREE.NearestFilter;
                setTexture(texture)
            },
            undefined, // onProgress callback, not needed here
            function (error) {
            }
        );
    }, [doorSpecs.textureImage, doorSpecs.numberOfDoors])

    // Nested DoorHandle function
    function DoorHandle(xPosition) {
        const handleWidth = 0.09;
        const handleHeight = 0.53 + numberOfDoors * 0.04;
        const handleDepth = 0.2;
        var handlePositionX = xPosition + sWidth / 2 + handleWidth / 2 - handleWidth / 3;
        if (doorHandleDirection) {
            handlePositionX = handlePositionX - sWidth + 0.025 * numberOfDoors
        } else {
            handlePositionX = handlePositionX - 0.025 * numberOfDoors

        }
        if (!doorHandleVisible || doorType === 4) {
            return null;
        }

        return (
            <Box args={[handleWidth, handleHeight, handleDepth]} position={[handlePositionX, 0, 0]}>
                <meshStandardMaterial color={frameColor} />
            </Box>
        );
    }

    function GetDoorGlassRectangle(xPosition) {
        let height = sHeight
        let y = 0

        let position = [xPosition, y, 0]
        return (
            <Box args={[sWidth, height, 0.01]} position={[...position]}>
                <meshPhysicalMaterial
                    attach="material"
                    map={doorSpecs.textureImage.length > 0 ? texture : null}
                    color={glassColor.length > 0 ? glassColor : ""}
                    transmission={1.0}
                    roughness={0.7}
                    metalness={0.0}
                    reflectivity={0.2}
                    clearcoat={0.5}
                />
            </Box>
        );
    }

    function Frame(xPosition) {
        var thickness = { left: 0.1, right: 0.1, top: 0.1, bottom: 0.1 }
        var frameDepth = 0.09;
        if (doorType === 1) {
            thickness = { left: 0.07, right: 0.07, top: 0.07, bottom: 0.07 }
            frameDepth = 0.09;
        }
        if (doorType === 2) {
            thickness = { left: 0.04, right: 0.05, top: 0.2 + numberOfDoors * 0.008, bottom: 0.2 + numberOfDoors * 0.008 }
            frameDepth = 0.07;
        }
        if (doorType === 3) {
            thickness = { left: 0.05, right: 0.05, top: 0.05, bottom: 0.05 }
            frameDepth = 0.07;
        }
        if (doorType === 4) {
            thickness = { left: 0.05, right: 0.05, top: 0.05, bottom: 0.05 }
            frameDepth = 0.07;
        }
        frameDepth = frameDepth + numberOfDoors * 0.008
        const TopFrame = () => {
            if (doorType === 1 || doorType === 3 || doorType === 4)
                return <>
                    <Box args={[sWidth + thickness.top * 2, thickness.top, frameDepth]}
                        position={[xPosition, sHeight / 2 + thickness.top / 2, 0]}>
                        <meshStandardMaterial color={frameColor}
                        />
                    </Box>
                </>
            if (doorType === 2)
                return <Box args={[sWidth + thickness.top * 2 - 0.4, thickness.top, frameDepth + 0.01]}
                    position={[xPosition, sHeight / 2 + thickness.top / 2 - thickness.top, 0]}>
                    <meshStandardMaterial color={frameColor} />
                </Box>

        }
        const TopDoorType3Frame = () => {
            const topFrameThickness = 0.15
            const topFramePosition = [(numberOfDoors == 2 ? -0.1 : 0), sHeight / 2 + thickness.top / 2, 0]
            return <Box args={[1.6 * sWidth + 0.8 * sWidth * numberOfDoors, topFrameThickness, frameDepth + 0.01]}
                position={[...topFramePosition]}>
                <meshStandardMaterial color={frameColor} />
            </Box>
        }
        const BottomFrame = () => {
            if (doorType === 1 || doorType === 4)
                return <Box args={[sWidth + thickness.bottom * 2, thickness.bottom, frameDepth]}
                    position={[xPosition, -sHeight / 2 - thickness.bottom / 2, 0]}>
                    <meshStandardMaterial color={frameColor} />
                </Box>
            if (doorType === 2)
                return <Box args={[sWidth + thickness.bottom * 2 - 0.4, thickness.bottom, frameDepth + 0.01]}
                    position={[xPosition, -sHeight / 2 - thickness.bottom / 2 + thickness.bottom, 0]}>
                    <meshStandardMaterial color={frameColor} />
                </Box>
            if (doorType === 3)
                return <Box args={[sWidth + thickness.bottom * 2, thickness.bottom, frameDepth]}
                    position={[xPosition, -sHeight / 2 - thickness.bottom / 2, 0]}>
                    <meshStandardMaterial color={frameColor} />
                </Box>

        }
        const LeftFrame =
            <Box args={[thickness.left, sHeight, frameDepth]}
                position={[xPosition + -sWidth / 2 - thickness.left / 2, 0, 0]}>
                <meshStandardMaterial color={frameColor} />
            </Box>
        const RightFrame =
            <Box args={[thickness.right, sHeight, frameDepth]}
                position={[xPosition + sWidth / 2 + thickness.right / 2, 0, 0]}>
                <meshStandardMaterial color={frameColor} />
            </Box>
        return (
            <>
                {doorType === 3 ? TopDoorType3Frame() : ''}
                {TopFrame()}
                {BottomFrame()}
                {LeftFrame}
                {RightFrame}
            </>
        );
    }


    // Usage

    function GetAGlassRectangle(xPosition, yPosition, panelWidth, panelHeight) {
        let position = [xPosition, yPosition, 0]
        let color = (glassColor.length > 0 ? glassColor : '')
        return (

            <Box args={[panelWidth, panelHeight, 0.01]} position={[...position]}>
                <meshPhysicalMaterial
                    attach="material"
                    color={color}
                    map={doorSpecs.textureImage.length > 0 ? texture : null}
                    transmission={1.0}
                    roughness={0.7}
                    metalness={0.0}
                    reflectivity={0.2}
                    clearcoat={0.5}
                />
            </Box>
        );
    }

    function LimitedOrbitControls() {
        const { camera, gl } = useThree();
        camera.zoom = zoom;
        camera.updateProjectionMatrix(); // Apply the zoom change.

        const controlsRef = useRef();

        useEffect(() => {
            // if (controlsRef.current) {
            //     // Lock the controls to prevent rotation around the y-axis (x-axis movement)
            //     const currentAzimuthAngle = controlsRef.current.getAzimuthalAngle();
            //     controlsRef.current.minAzimuthAngle = currentAzimuthAngle;
            //     controlsRef.current.maxAzimuthAngle = currentAzimuthAngle;

            //     // Lock polar angle to prevent rotation up/down
            //     const currentPolarAngle = controlsRef.current.getPolarAngle();
            //     controlsRef.current.minPolarAngle = currentPolarAngle;
            //     controlsRef.current.maxPolarAngle = currentPolarAngle;
            //     controlsRef.current.enableZoom = false;
            //     controlsRef.current.enableRotate = false;
            // }

            if (controlsRef.current) {
                // Disable all movements along x, y, and z axes
                controlsRef.current.enableZoom = true;
                controlsRef.current.enableRotate = false;
                controlsRef.current.enablePan = false;

                // Lock the controls to prevent rotation around the y-axis (x-axis movement)
                const currentAzimuthAngle = controlsRef.current.getAzimuthalAngle();
                controlsRef.current.minAzimuthAngle = currentAzimuthAngle;
                controlsRef.current.maxAzimuthAngle = currentAzimuthAngle;

                // Lock polar angle to prevent rotation up/down
                const currentPolarAngle = controlsRef.current.getPolarAngle();
                controlsRef.current.minPolarAngle = currentPolarAngle;
                controlsRef.current.maxPolarAngle = currentPolarAngle;
            }
        }, [controlsRef]);

        return <OrbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
    }


    // function LimitedOrbitControls() {
    //     const { camera, gl } = useThree();

    //     // Disable rotation and zoom
    //     const controlsRef = useRef();
    //     useEffect(() => {
    //       if (controlsRef.current) {
    //         controlsRef.current.enableRotate = false;
    //         controlsRef.current.enableZoom = false;
    //       }
    //     }, [controlsRef]);

    //     return <OrbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
    //   }

    const lightRef = useRef();

    function createBar(xPosition, yPosition, width, height, allowX, allowY, maxLeftX, maxRightX, maxTopY, maxBottomY) {
        var frameDepth = 0.09;
        let position = [xPosition, yPosition, 0];
        let args = [width, height, frameDepth];

        return (
            <DraggableBox
                args={args}
                position={position}
                frameColor={frameColor}
                allowX={allowX}
                allowY={allowY}
                leftX={maxLeftX}
                rightX={maxRightX}
                topY={maxTopY}
                bottomY={maxBottomY}
            />
        );

        // return <Box args={[width, height, frameDepth]}
        //     position={position}>
        //     <meshStandardMaterial color={frameColor} />
        // </Box>
    }

    function CreateDoor(xPosition, handleVisible) {
        function createVDoorBars() {
            let rods = []
            let startX = xPosition - sWidth / 2 + sWidth / 5
            for (let i = 0; i < doorSpecs.numberOfVBars; i++) {
                let width = 0.04
                if (i == 0 || i == 3)
                    width = 0.05
                //maxLeftX,maxRightX, maxTopY,maxBottomY
                rods.push(createBar(startX, 0, width, sHeight, true, false, xPosition - sWidth / 2 + 0.05, xPosition + sWidth / 2 - 0.05))
                startX += sWidth / 5
            }
            return <>{rods}</>
        }
        function createHDoorBars() {
            let rods = []
            let startY = 0 + sHeight / 2 - sHeight / 5
            for (let i = 0; i < doorSpecs.numberOfHBars; i++) {
                let height = 0.04
                if (i == 0 || i == 3)
                    height = 0.05
                //maxLeftX,maxRightX, maxTopY,maxBottomY
                rods.push(createBar(xPosition, startY, sWidth, height, false, true, null, null, sHeight / 2 - 0.05, -sHeight / 2 + 0.05))
                startY -= sHeight / 5
            }
            return <>{rods}</>
        }

        return <>
            {Frame(xPosition)}

            {handleVisible ? DoorHandle(xPosition) : ''}
            {GetDoorGlassRectangle(xPosition)}
            {createVDoorBars()}
            {createHDoorBars()}
        </>
    }

    function createPanelFrame(xPosition, yPosition, width, height) {
        var thickness = { left: 0.05, right: 0.05, top: 0.05, bottom: 0.05 }
        var frameDepth = 0.09;
        let frameColor = doorSpecs.frameColor
        const LeftFrame =
            <Box args={[thickness.left, height, frameDepth]}
                position={[xPosition + -width / 2 - thickness.left / 2, yPosition, 0]}>
                <meshStandardMaterial color={frameColor} />
            </Box>
        const RightFrame =
            <Box args={[thickness.right, height, frameDepth]}
                position={[xPosition + width / 2 + thickness.right / 2, yPosition, 0]}>
                <meshStandardMaterial color={frameColor} />
            </Box>
        const TopFrame =
            <Box args={[width + thickness.top * 2, thickness.top, frameDepth]}
                position={[xPosition, yPosition + height / 2 + thickness.top / 2, 0]}>
                <meshStandardMaterial color={frameColor} />
            </Box>
        const BottomFrame =
            <Box args={[width + thickness.bottom * 2, thickness.bottom, frameDepth]}
                position={[xPosition, yPosition - height / 2 - thickness.bottom / 2, 0]}>
                <meshStandardMaterial color={frameColor} />
            </Box>
        return (
            <>
                {TopFrame}
                {LeftFrame}
                {RightFrame}
                {BottomFrame}
            </>
        );
    }
    function createLeftPanel(xPosition) {
        const width = convertMmToDoorWidth(doorSpecs.leftPanel.width)
        const x = xPosition - sWidth / 2 - width / 2 - 0.05
        function createLeftPanelVBars() {
            if (doorSpecs.leftRightPanelVBars == 0)
                return <></>
            let leftPanelWidth = width
            let rods = []
            let startX = x - leftPanelWidth / 2 + leftPanelWidth / 2
            // for(let i=0;i<doorSpecs.leftRightPanelVBars; i++){
            //     let width=0.04
            //     if(i==0 || i==3)
            //         width=0.05
            //     rods.push(createBar(startX,0,width, sHeight))                
            //     startX+=leftPanelWidth/3
            // }

            //maxLeftX,maxRightX, maxTopY,maxBottomY
            rods.push(createBar(startX, 0, 0.04, sHeight, true, false, startX - leftPanelWidth / 2 + 0.05, startX + leftPanelWidth / 2 - 0.05))
            return <>{rods}</>
        }
        function createLeftPanelHBars() {
            let rods = []
            let startY = 0 + sHeight / 2 - sHeight / 5
            for (let i = 0; i < doorSpecs.leftRightPanelHBars; i++) {
                let height = 0.04
                if (i == 0 || i == 3)
                    height = 0.05
                //maxLeftX,maxRightX, maxTopY,maxBottomY
                rods.push(createBar(x, startY, width, height, false, true, null, null, sHeight / 2 - 0.05, -sHeight / 2 + 0.05))
                startY -= sHeight / 5
            }
            return <>{rods}</>
        }

        return <>
            {createPanelFrame(x, 0, width, sHeight + 0.05)}
            {GetAGlassRectangle(x, 0, width, sHeight + 0.05)}
            {createLeftPanelVBars()}
            {createLeftPanelHBars()}
        </>
    }

    function createTopPanel() {
        const height = convertMmToDoorHeight(doorSpecs.topPanel.length)
        let y = 0 + sHeight / 2 + height / 2 + 0.09

        let width = doorSpecs.numberOfDoors * sWidth + convertMmToDoorWidth(doorSpecs.leftPanel.width) + convertMmToDoorWidth(doorSpecs.rightPanel.width) + 0.03
        let x = 0

        if (doorSpecs.leftPanel.width > 0) {
            width += 0.04
        }
        if (doorSpecs.rightPanel.width > 0) {
            width += 0.04
        }
        if (doorSpecs.leftPanel.width > 0 && doorSpecs.rightPanel.width > 0) {
            x = x + convertMmToDoorWidth(doorSpecs.rightPanel.width) / 2 - convertMmToDoorWidth(doorSpecs.leftPanel.width) / 2
        }
        else {
            if (doorSpecs.leftPanel.width > 0) {
                x = x - convertMmToDoorWidth(doorSpecs.leftPanel.width) / 2 - 0.01
            } else {
                x = x + convertMmToDoorWidth(doorSpecs.rightPanel.width) / 2 + 0.01
            }
        }
        if (doorSpecs.leftPanel.width == 0 && doorSpecs.rightPanel.width == 0) {
            x = x - 0.01
        }

        function createTopPanelVBars() {
            let rods = []
            let startX = x - sWidth / 2 + sWidth / 5

            for (let i = 0; i < doorSpecs.topPanel.numberOfVBars; i++) {
                let width = 0.04
                if (i == 0 || i == 3)
                    width = 0.05
                rods.push(createBar(startX, y, width, height, false, false))
                startX += sWidth / 5
            }
            return <>{rods}</>
        }
        function createTopPanelHBars() {
            let rods = []
            let startY = y + height / 2 - height / 5
            for (let i = 0; i < doorSpecs.topPanel.numberOfHBars; i++) {
                let barHeight = 0.04
                if (i == 0 || i == 3)
                    barHeight = 0.05

                //maxLeftX,maxRightX, maxTopY,maxBottomY
                rods.push(createBar(x, startY, width, barHeight, false, true, null, null, y + height / 2 - 0.09, y - height / 2 + 0.09))
                startY -= height / 5
            }
            return <>{rods}</>
        }


        return <>
            {createPanelFrame(x, y, width, height)}
            {GetAGlassRectangle(x, y, width, height)}
            {createTopPanelVBars()}
            {createTopPanelHBars()}
        </>
    }

    function createBottomSteelPanel(tempX = 0) {
        const height = convertMmToDoorHeight(doorSpecs.bottomSteelPanel.length)
        let y = 0 - sHeight / 2 + height / 2
        let width = doorSpecs.numberOfDoors * sWidth
        let x = tempX
        let position = [x, y, 0]
        var thickness = { left: 0.05, right: 0.05, top: 0.05, bottom: 0.05 }
        var frameDepth = 0.09;

        return <>

            <Box args={[width + thickness.bottom * 2, height, frameDepth]}
                position={[...position]}>
                <meshStandardMaterial
                    color={frameColor}
                />
            </Box>
        </>
    }

    function createRightPanel(xPosition) {
        const width = convertMmToDoorWidth(doorSpecs.rightPanel.width)
        const x = xPosition + sWidth / 2 + width / 2 + 0.05
        function createRightPanelVBars() {
            if (doorSpecs.leftRightPanelVBars == 0)
                return <></>
            let rightPanelWidth = width
            let rods = []
            let startX = x - rightPanelWidth / 2 + rightPanelWidth / 2
            // for(let i=0;i<doorSpecs.leftRightPanelVBars; i++){
            //     let width=0.04
            //     if(i==0 || i==3)
            //         width=0.05
            //     rods.push(createBar(startX,0,width, sHeight))                
            //     startX+=rightPanelWidth/3
            // }
            //maxLeftX,maxRightX, maxTopY,maxBottomY
            rods.push(createBar(startX, 0, 0.04, sHeight, true, false, x - rightPanelWidth / 2 + 0.05, x + rightPanelWidth / 2 - 0.05))
            return <>{rods}</>
        }
        function createRightPanelHBars() {
            let rods = []
            let startY = 0 + sHeight / 2 - sHeight / 5
            for (let i = 0; i < doorSpecs.leftRightPanelHBars; i++) {
                let height = 0.04
                if (i == 0 || i == 3)
                    height = 0.05

                rods.push(createBar(x, startY, width, height, false, true, null, null, sHeight / 2 - 0.05, -sHeight / 2 + 0.05))
                startY -= sHeight / 5
            }
            return <>{rods}</>
        }

        return <>
            {createPanelFrame(x, 0, width, sHeight + 0.05)}
            {GetAGlassRectangle(x, 0, width, sHeight + 0.05)}
            {createRightPanelVBars()}
            {createRightPanelHBars()}
        </>
    }


    function getFirstDoorMidX() {
        let halfTotalWidth = (doorSpecs.numberOfDoors * sWidth) / 2
        let t1 = halfTotalWidth - sWidth
        let firstMidX = t1 + sWidth / 2
        return -firstMidX
    }
    function GenerateDoors(n) {
        const doors = []
        let startX = getFirstDoorMidX()

        if (n === 1 && doorType === 3) {
            doors.push(CreateDoor(1, true))
            if (doorSpecs.bottomSteelPanel.include && doorSpecs.bottomSteelPanel.length > 0) {
                doors.push(createBottomSteelPanel(1))
            }
            return <>{doors}</>
        }
        if (n === 1) {

            if (doorSpecs.topPanel.include && doorSpecs.topPanel.length > 0) {
                doors.push(createTopPanel())
            }

            if (doorSpecs.leftPanel.width > 0) {
                doors.push(createLeftPanel(0))
            }
            if (doorSpecs.rightPanel.width > 0) {
                doors.push(createRightPanel(0))
            }
            if (doorSpecs.bottomSteelPanel.include && doorSpecs.bottomSteelPanel.length > 0) {
                doors.push(createBottomSteelPanel())
            }

            doors.push(CreateDoor(0, true))
            return <>{doors}</>
        }

        var remainder = 0
        if (doorHandleDirection)
            remainder = 1

        let handleVisible = true
        if (doorSpecs.doorType != 3 && doorSpecs.leftPanel.width > 0) {
            doors.push(createLeftPanel(startX))
        }
        if (doorSpecs.doorType != 3 && doorSpecs.topPanel.include && doorSpecs.topPanel.length > 0) {
            doors.push(createTopPanel())
        }

        for (let i = 0; i < n; i++) {
            if (i % 2 == remainder)
                handleVisible = true
            else
                handleVisible = false
            doors.push(CreateDoor(startX, handleVisible))
            startX = startX + sWidth
        }
        startX = startX - sWidth
        if (doorSpecs.doorType != 3 && doorSpecs.rightPanel.width > 0) {
            doors.push(createRightPanel(startX))
        }

        if (doorSpecs.bottomSteelPanel.include && doorSpecs.bottomSteelPanel.length > 0) {
            doors.push(createBottomSteelPanel())
        }


        return <>{doors}</>
    }




    function AutoAdjustCamera({ children }) {

        const { camera, scene, size } = useThree();
        const targetPosition = useRef(new Vector3());
        const targetLookAt = useRef(new Vector3());


        useEffect(() => {
            // Calculate the bounding box of the entire scene
            const bbox = new Box3().setFromObject(scene);
            const center = bbox.getCenter(new Vector3());
            const size = bbox.getSize(new Vector3());

            // Adjust camera
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            let cameraZ = Math.abs(maxDim / 4 * Math.tan(fov * 2));

            // Adjust for the camera's min distance and add some margin
            cameraZ *= 2.8;
            targetPosition.current.set(camera.position.x, camera.position.y, cameraZ);

            // Adjust the focus point based on the camera's distance
            const focusShift = cameraZ / maxDim; // Adjust this factor as needed
            targetLookAt.current.set(center.x, center.y + focusShift, center.z);
            let sizeWidth = window.innerWidth
            // If the screen size is small (mobile), zoom in
            const isMobile = sizeWidth <= 600; // Adjust the threshold as needed

            if (isMobile) {
                const zoomInRatio = 1.0; // Adjust this ratio as needed
                cameraZ *= zoomInRatio;
                targetPosition.current.set(camera.position.x, camera.position.y, cameraZ);
            }

            // Smooth transition
            const transitionDuration = 500; // Transition duration in ms
            const startTime = Date.now();

            const animate = () => {
                const currentTime = Date.now();
                const elapsedTime = currentTime - startTime;
                if (elapsedTime < transitionDuration) {
                    const alpha = elapsedTime / transitionDuration;

                    // Interpolate position
                    camera.position.lerp(targetPosition.current, alpha);
                    camera.lookAt(targetLookAt.current.lerp(camera.position, alpha));
                    camera.updateProjectionMatrix();

                    requestAnimationFrame(animate);
                }
            };

            animate();
        }, [camera, scene, size]);

        return children;
    }

    return (
        <Canvas  onCreated={({ gl }) => (rendererRef.current = gl)} gl={{ preserveDrawingBuffer: true }} >
            <ambientLight intensity={0.9} />
            <directionalLight ref={lightRef} position={[5, 9, -50]} intensity={0.2} color="white" />
            {/* <directionalLight position={[-5, 0, -5]} intensity={1.5} color="white" /> */}
            <AutoAdjustCamera>
                {GenerateDoors(numberOfDoors)}
                <LimitedOrbitControls />
            </AutoAdjustCamera>

        </Canvas>
    );
}

export default DoorScene;
