/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

interface Vector3D {
    start: [number, number, number];
    end: [number, number, number];
    color?: string;
    label?: string;
}

interface VectorSceneProps {
    vectors: Vector3D[];
}

const AnimatedArrow: React.FC<{ vec: Vector3D; animateKey: number }> = ({ vec, animateKey }) => {
    const lineRef = useRef<THREE.Line>(null!);
    const coneRef = useRef<THREE.Mesh>(null!);
    const progress = useRef(0);

    const startVec = useMemo(() => new THREE.Vector3(...vec.start), [vec.start]);
    const endVec = useMemo(() => new THREE.Vector3(...vec.end), [vec.end]);

    const geometry = useMemo(() => {
        const positions = new Float32Array(6); // 2 points * 3 coords
        positions.set([startVec.x, startVec.y, startVec.z, startVec.x, startVec.y, startVec.z]);
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return g;
    }, [startVec]);

    const material = useMemo(() => new THREE.LineBasicMaterial({ color: vec.color || 'blue' }), [vec.color]);

    // Initialize line object once
    useMemo(() => {
        lineRef.current = new THREE.Line(geometry, material);
    }, [geometry, material]);

    useFrame((_, delta) => {
        progress.current = Math.min(progress.current + delta, 1);
        const currentPoint = new THREE.Vector3().lerpVectors(startVec, endVec, progress.current);

        const posAttr = geometry.attributes.position as THREE.BufferAttribute;
        posAttr.setXYZ(1, currentPoint.x, currentPoint.y, currentPoint.z);
        posAttr.needsUpdate = true;

        if (coneRef.current) {
            coneRef.current.position.copy(currentPoint);
            const dir = new THREE.Vector3().subVectors(currentPoint, startVec).normalize();
            const axis = new THREE.Vector3(0, 1, 0);
            const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, dir);
            coneRef.current.setRotationFromQuaternion(quaternion);
        }
    });

    React.useEffect(() => {
        progress.current = 0;
        const posAttr = geometry.attributes.position as THREE.BufferAttribute;
        posAttr.setXYZ(1, startVec.x, startVec.y, startVec.z);
        posAttr.needsUpdate = true;
    }, [animateKey, geometry, startVec]);

    const labelPos = useMemo(() => new THREE.Vector3().lerpVectors(startVec, endVec, 0.5), [startVec, endVec]);

    return (
        <>
            <primitive object={lineRef.current} />
            <mesh ref={coneRef}>
                <coneGeometry args={[0.1, 0.3, 8]} />
                <meshBasicMaterial color={vec.color || 'blue'} />
            </mesh>
            {vec.label && (
                <Html position={labelPos.toArray()}>
                    <div
                        style={{
                            color: vec.color || 'blue',
                            background: 'white',
                            padding: '2px 4px',
                            borderRadius: '4px',
                            fontSize: '12px',
                        }}
                    >
                        {vec.label}
                    </div>
                </Html>
            )}
        </>
    );
};

export const VectorScene: React.FC<VectorSceneProps> = ({ vectors }) => {
    const [animateKey, setAnimateKey] = useState(0);
    console.log(vectors[0]);

    return (
        <div style={{ width: '100%', height: '500px', position: 'relative', color: 'var(--base-brand)' }}>
            <button
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    zIndex: 1,
                    padding: '8px 12px',
                    background: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
                onClick={() => setAnimateKey((k) => k + 1)}
            >
                Перезапустить анимацию
            </button>
            <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <gridHelper args={[10, 10]} />
                <axesHelper
                    ref={(ref) => {
                        if (ref) {
                            (ref.material as THREE.LineBasicMaterial).color.set('#cccccc');
                        }
                    }}
                    args={[5]}
                />
                <OrbitControls />

                {vectors.map((vec, idx) => (
                    <AnimatedArrow key={idx} vec={vec} animateKey={animateKey} />
                ))}
            </Canvas>
        </div>
    );
};
