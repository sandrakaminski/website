import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

type LoadResp = {
    load: boolean;
};

export const useImageSrc = (src: string): LoadResp => {
    const [load, setLoad] = useState<boolean>(true);
    const imageSrc = (setLoad: (load: boolean) => void, src: string): string => {
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
    };

    useQuery({
        queryKey: ["imageSrc", src],
        queryFn: () => imageSrc(setLoad, src),
    })

    return { load };
};

export default useImageSrc;