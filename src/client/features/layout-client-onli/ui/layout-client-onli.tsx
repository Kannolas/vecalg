import { useState, useEffect } from 'react';

// @ts-ignore
const LayoutClientOnly = ({ children }) => {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return mounted ? children : null;
};

export default LayoutClientOnly;
