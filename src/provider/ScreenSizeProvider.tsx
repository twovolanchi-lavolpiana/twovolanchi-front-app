import React, { createContext, ReactNode, useCallback, useEffect, useState } from "react";

interface ScreenSizeContextProps {
    vh: number;
    vw: number;
    updateScreenSize: () => void;
}

const ScreenSizeContext = createContext<ScreenSizeContextProps | undefined>(undefined);

interface ScreenSizeProviderProps {
    children: ReactNode;
}

export const ScreenSizeProvider: React.FC<ScreenSizeProviderProps> = ({ children }) => {
    const [vh, setVh] = useState(window.innerHeight * 0.01);
    const [vw, setVw] = useState(window.innerWidth * 0.01);

    const updateScreenSize = useCallback(() => {
        setVh(window.innerHeight * 0.01);
        setVw(window.innerWidth * 0.01);
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        document.documentElement.style.setProperty('--vw', `${window.innerWidth * 0.01}px`);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', updateScreenSize);
        return () => {
            window.removeEventListener('resize', updateScreenSize);
        };
    }, []);

    useEffect(() => {
        updateScreenSize();
    }, [updateScreenSize]);

    return (
        <ScreenSizeContext.Provider value={{ vh, vw, updateScreenSize }}>
            {children}
        </ScreenSizeContext.Provider>
    );
}

export const useScreenSize = () => {
    const context = React.useContext(ScreenSizeContext);
    if (!context) {
        throw new Error('useScreenSize must be used within a ScreenSizeProvider');
    }
    return context;
};