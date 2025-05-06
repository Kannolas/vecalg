import katex from 'katex';
import { useEffect, useRef } from 'react';

interface KatexProps {
    formula: string;
    displayMode?: boolean; // true для display mode, false для inline mode
    color?: string;
}

export const Formula: React.FC<KatexProps> = ({ formula, displayMode = false, color = 'currentColor' }) => {
    const element = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (element.current) {
            try {
                katex.render(formula, element.current, {
                    displayMode,
                    throwOnError: false, // Обработка ошибок рендеринга
                });
            } catch (error) {
                console.error('Ошибка рендеринга KaTeX:', error);
                element.current.textContent = 'Ошибка рендеринга формулы';
            }
        }
    }, [formula, displayMode]);

    return <span ref={element} style={{ color }} />;
};
