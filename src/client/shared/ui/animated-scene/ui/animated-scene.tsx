import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Html } from '@react-three/drei';
import * as THREE from 'three';

interface Vector3D {
    start: [number, number, number];
    end: [number, number, number];
    color?: string;
    label?: string;
}

interface VectorSceneProps {
    vectors: Vector3D[];
    gridSize?: number;
    gridDivisions?: number;
    axisLength?: number;
}

const Arrow: React.FC<{
    start: [number, number, number];
    end: [number, number, number];
    color?: string;
    label?: string;
}> = ({ start, end, color = 'blue', label }) => {
    const dir = new THREE.Vector3(end[0] - start[0], end[1] - start[1], end[2] - start[2]).normalize();

    const length = new THREE.Vector3(end[0] - start[0], end[1] - start[1], end[2] - start[2]).length();

    const position = new THREE.Vector3()
        .addVectors(new THREE.Vector3(...start), new THREE.Vector3(...end))
        .multiplyScalar(0.5);

    return (
        <>
            <Line points={[start, end]} color={color} lineWidth={2} derivatives={false} />
            <mesh position={end}>
                <coneGeometry args={[0.2, 0.5, 8]} />
                <meshBasicMaterial color={color} />
            </mesh>
            {label && (
                <Html position={position.toArray()}>
                    <div
                        style={{
                            color,
                            fontSize: '12px',
                            background: 'white',
                            padding: '2px 4px',
                            borderRadius: '4px',
                        }}
                    >
                        {label}
                    </div>
                </Html>
            )}
        </>
    );
};

export const VectorScene: React.FC<VectorSceneProps> = ({
    vectors,
    gridSize = 10,
    gridDivisions = 10,
    axisLength = 5,
}) => {
    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <gridHelper args={[gridSize, gridDivisions]} />
                <axesHelper args={[axisLength]} />
                <OrbitControls />

                {vectors.map((vec, idx) => (
                    <Arrow key={idx} start={vec.start} end={vec.end} color={vec.color} label={vec.label} />
                ))}
            </Canvas>
        </div>
    );
};
