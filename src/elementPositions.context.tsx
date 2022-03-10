import React, { createContext, useCallback, useEffect, useState } from 'react';
import { hasWindow, hasDocument, windowWidth, windowHeight } from '@speaker-ender/js-measure';
import { useClientHook } from '@speaker-ender/react-ssr-tools';

export type IElementPositionsState = Partial<ReturnType<typeof useElementPositionsState>>;

export const ElementPositionsContext = createContext<IElementPositionsState | null>(
    null
);

export interface IPositionsCallbackProps {
    width: number,
    height: number,
}

export type PositionsCallback = (IPositionsCallbackProps?: IPositionsCallbackProps) => void;

export const useElementPositionsState = () => {
    const isClientSide = useClientHook();

    useEffect(() => {

        return () => {
        };
    }, []);

    return {};
};

export const useElementPositionsContext = () => {
    const elementPositionsContext = React.useContext(ElementPositionsContext);

    if (!elementPositionsContext) {
        throw new Error(
            'NavMeta Context used outside of NavMetaContext.Provider'
        );
    }

    return elementPositionsContext;
};

export const ElementPositionsContextProvider: React.FC = (props) => {
    const windowState = useElementPositionsState();

    return (
        <ElementPositionsContext.Provider value={windowState}>
            {props.children}
        </ElementPositionsContext.Provider>
    );
};

