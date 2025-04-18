import { useEffect } from 'react';

const useFont = (font: { variable: string; className: string }) => {
    useEffect(() => {
        const html = document.querySelector('html');

        if (html) {
            html.classList.add(font.variable);
        }

        return () => {
            if (html) {
                html.classList.remove(font.variable);
            }
        };
    }, [font.variable]);
};

export default useFont;
