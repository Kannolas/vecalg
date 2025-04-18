import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = <T extends any[]>(fn: (...args: T) => void, delay: number) => {
    const timeoutRef = useRef<NodeJS.Timeout>();

    return useCallback(
        (...args: T) => {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => fn(...args), delay);
        },
        [fn, delay],
    );
};
