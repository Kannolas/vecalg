import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Vector {
    startX?: number | null;
    startY?: number | null;
    startZ?: number | null;
    animationEndX?: number | null;
    animationEndY?: number | null;
    animationEndZ?: number | null;
    color?: string | null;
    startLabel?: string | React.ReactNode;
    endLabel?: string | React.ReactNode;
    vectorLabel?: React.ReactNode;
    arrowSize?: number | null;
    zIndex?: number | null;
}

interface AnimatedVectorFramerProps {
    width?: number;
    height?: number;
    vectors: Vector[];
    gridColor?: string;
    duration?: number;
    showLabels?: boolean;
    labelColor?: string;
    labelSize?: number;
}

export const AnimatedVector: React.FC<AnimatedVectorFramerProps> = ({
    width = 500,
    height = 300,
    vectors,
    gridColor = '#ddd',
    duration = 1,
    showLabels = true,
    labelColor = 'currentColor',
    labelSize = 12,
}) => {
    const gridSpacing = 50;
    const delayPerVector = 0.5;

    const [isHovered, setIsHovered] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);

    const restartAnimation = () => {
        setAnimationKey((prev) => prev + 1);
    };

    const gridLinesHorizontal = React.useMemo(
        () => Array.from({ length: Math.floor(height / gridSpacing) + 1 }, (_, i) => i * gridSpacing),
        [height, gridSpacing],
    );
    const gridLinesVertical = React.useMemo(
        () => Array.from({ length: Math.floor(width / gridSpacing) + 1 }, (_, i) => i * gridSpacing),
        [width, gridSpacing],
    );

    return (
        <div
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && (
                <button
                    onClick={restartAnimation}
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        zIndex: 10,
                        padding: '5px 10px',
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontSize: 12,
                    }}
                >
                    Перезапустить
                </button>
            )}

            <svg width={width} height={height} key={animationKey}>
                {/* Сетка */}
                {gridLinesHorizontal.map((y, index) => (
                    <line
                        key={`horizontal-${index}`}
                        x1="0"
                        y1={height - y}
                        x2={width}
                        y2={height - y}
                        stroke={gridColor}
                        strokeWidth="0.5"
                    />
                ))}
                {gridLinesVertical.map((x, index) => (
                    <line
                        key={`vertical-${index}`}
                        x1={x}
                        y1="0"
                        x2={x}
                        y2={height}
                        stroke={gridColor}
                        strokeWidth="0.5"
                    />
                ))}

                {/* Векторы */}
                {vectors
                    .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
                    .map((vector, index) => {
                        const {
                            startX,
                            startY,
                            animationEndX,
                            animationEndY,
                            color,
                            startLabel,
                            endLabel,
                            vectorLabel,
                            arrowSize = 10,
                        } = vector;

                        const calculateArrowPoints = (x1: number, y1: number, x2: number, y2: number, size: number) => {
                            const angle = Math.atan2(y2 - y1, x2 - x1);
                            const arrowPoint1X = x2 - size * Math.cos(angle - Math.PI / 6);
                            const arrowPoint1Y = y2 - size * Math.sin(angle - Math.PI / 6);
                            const arrowPoint2X = x2 - size * Math.cos(angle + Math.PI / 6);
                            const arrowPoint2Y = y2 - size * Math.sin(angle + Math.PI / 6);
                            return `${x2},${y2} ${arrowPoint1X},${arrowPoint1Y} ${arrowPoint2X},${arrowPoint2Y}`;
                        };

                        const transition = {
                            duration,
                            ease: 'easeInOut',
                            delay: index * delayPerVector,
                        };

                        const variants = {
                            initial: {
                                x2: startX || 0,
                                y2: height - (startY || 0),
                                arrowPoints: calculateArrowPoints(
                                    startX || 0,
                                    height - (startY || 0),
                                    startX || 0,
                                    height - (startY || 0),
                                    arrowSize || 10,
                                ),
                                opacity: 0,
                            },
                            animate: {
                                x2: animationEndX || 0,
                                y2: height - (animationEndY || 0),
                                arrowPoints: calculateArrowPoints(
                                    startX || 0,
                                    height - (startY || 0),
                                    animationEndX || 0,
                                    height - (animationEndY || 0),
                                    arrowSize || 0,
                                ),
                                opacity: 1,
                                transition,
                            },
                        };

                        const midX = ((startX || 0) + (animationEndX || 0)) / 2;
                        const midY = height - ((startY || 0) + (animationEndY || 0)) / 2;

                        return (
                            <React.Fragment key={`vector-${index}`}>
                                <motion.circle
                                    cx={startX || 0}
                                    cy={height - (startY || 0)}
                                    r={3}
                                    fill={color || 'currentColor'}
                                    variants={variants}
                                    initial="initial"
                                    animate="animate"
                                />

                                <motion.line
                                    x1={startX || 0}
                                    y1={height - (startY || 0)}
                                    stroke={color || 'currentColor'}
                                    strokeWidth="2"
                                    variants={variants}
                                    initial="initial"
                                    animate="animate"
                                />
                                <motion.polygon
                                    points={variants.animate.arrowPoints}
                                    fill={color || 'currentColor'}
                                    stroke={color || 'currentColor'}
                                    variants={variants}
                                    initial="initial"
                                    animate="animate"
                                />

                                {vectorLabel && (
                                    <foreignObject
                                        x={midX - 50}
                                        y={midY - 20}
                                        width="100"
                                        height="20"
                                        style={{ overflow: 'visible' }}
                                    >
                                        <div
                                            style={{
                                                fontSize: labelSize,
                                                color: labelColor,
                                                textAlign: 'center',
                                            }}
                                        >
                                            {vectorLabel}
                                        </div>
                                    </foreignObject>
                                )}

                                {showLabels && (
                                    <>
                                        <text
                                            x={(startX || 0) - 10}
                                            y={height - (startY || 0) - 5}
                                            fontSize={labelSize}
                                            fill={labelColor}
                                            textAnchor="end"
                                        >
                                            {startLabel || ''}
                                        </text>
                                        <motion.text
                                            x={(animationEndX || 0) - 10}
                                            y={height - (animationEndY || 0) - 5}
                                            fontSize={labelSize}
                                            fill={labelColor}
                                            textAnchor="end"
                                            variants={variants}
                                            initial="initial"
                                            animate="animate"
                                        >
                                            {endLabel || ''}
                                        </motion.text>
                                    </>
                                )}
                            </React.Fragment>
                        );
                    })}
            </svg>
        </div>
    );
};
