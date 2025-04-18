import { useState, useEffect, useRef } from 'react';

export const useOutsideClick = (initialValue: boolean) => {
    const [isActive, setIsActive] = useState(initialValue);
    const ref = useRef<HTMLButtonElement>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClick = (e: any) => {
        if (ref.current && !ref?.current?.contains(e.target)) {
            return setIsActive(false);
        }
        setIsActive(true);
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    });

    return { ref, isActive, setIsActive };
};
