import { Skeleton as SkeletonComponent, SkeletonCircle } from '@chakra-ui/skeleton';
import { useTheme } from 'next-themes';

interface SkeletonProps {
    borderRadius?: number;
    height?: number;
    width?: string | number;
    marginTop?: number;
    type?: 'circle';
    size?: string;
    className?: string;
}

export const Skeleton = ({ borderRadius, height, width, marginTop, type, size, className }: SkeletonProps) => {
    const { resolvedTheme } = useTheme();

    const skeletonWidth = () => {
        if (typeof width === 'number') {
            return width;
        }
        return `${width}`;
    };

    if (type === 'circle') {
        return (
            <SkeletonCircle
                className={className}
                borderRadius="full"
                startColor={resolvedTheme === 'dark' ? '#242529' : '#F7FAFC'}
                endColor={resolvedTheme === 'dark' ? '#37373F' : '#E2E8F0'}
                height={height}
                width={skeletonWidth()}
                marginTop={marginTop}
                size={size}
            />
        );
    }

    return (
        <SkeletonComponent
            className={className}
            borderRadius={borderRadius}
            startColor={resolvedTheme === 'dark' ? '#242529' : '#F7FAFC'}
            endColor={resolvedTheme === 'dark' ? '#37373F' : '#E2E8F0'}
            height={height}
            width={skeletonWidth()}
            marginTop={marginTop}
        />
    );
};
