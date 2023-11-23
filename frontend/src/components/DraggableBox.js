import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';


export default function DraggableBox({ args, position, frameColor, allowX = true, allowY = false, leftX, rightX, topY, bottomY }) {
    const meshRef = useRef();
    const [isDragging, setIsDragging] = useState(false);
    const [dragPosition, setDragPosition] = useState({ x: position[0], y: position[1], z: position[2] });
    const { camera, mouse } = useThree();

    const handleMouseDown = (e) => {
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useFrame(() => {
        if (isDragging) {
            const vector = new THREE.Vector3(mouse.x, mouse.y, 0);
            vector.unproject(camera);
            const dir = vector.sub(camera.position).normalize();
            const distance = -camera.position.z / dir.z;
            const pos = camera.position.clone().add(dir.multiplyScalar(distance));

            // Clamp position within the specified boundaries
            const clampedX = allowX ? THREE.MathUtils.clamp(pos.x, leftX, rightX) : dragPosition.x;
            const clampedY = allowY ? THREE.MathUtils.clamp(pos.y, bottomY, topY) : dragPosition.y;

            setDragPosition({ x: clampedX, y: clampedY, z: dragPosition.z });
        }

        if (meshRef.current) {
            meshRef.current.position.x = dragPosition.x;
            meshRef.current.position.y = dragPosition.y;
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={[dragPosition.x, dragPosition.y, dragPosition.z]}
            onPointerDown={handleMouseDown}
            onPointerUp={handleMouseUp}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}
        >
            <boxGeometry args={args} />
            <meshStandardMaterial color={frameColor} />
        </mesh>
    );
}
