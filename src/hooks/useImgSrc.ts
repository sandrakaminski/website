import { useEffect, useState, useCallback } from "react";

type LoadResp = {
    load: boolean;
};

export const useImageSrc = (src: string): LoadResp => {
    const [load, setLoad] = useState<boolean>(true);

    const imageSrc = useCallback((): string => {
        setLoad(true);
        const imageToLoad = new Image();
        imageToLoad.src = src;
        imageToLoad.onload = () => {
            const loaded = setTimeout(() => {
                setLoad(false);
            }, 100);

            return () => { clearTimeout(loaded); };
        };
        return src;
    }, [src]);

    useEffect(() => {
        imageSrc();
    }, [imageSrc, setLoad, src]);

    return { load };
};

export default useImageSrc;