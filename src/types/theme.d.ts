import 'next-themes';

export {};

declare global {
    type Theme = 'dark' | 'light';
}

declare module 'next-themes' {
    const resolvedTheme: Theme;
    export default resolvedTheme;
}
