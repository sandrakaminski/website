import React, { JSX } from "react";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";

type MediaUploaderProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    title?: string;
    name?: string;
};

const MediaUploader = (props: MediaUploaderProps): JSX.Element => {
    const { title } = props;

    return (
        <>
            <input
                {...props}
                accept="image/png, image/jpeg"
                style={{ display: "none" }}
                id={"file-upload"}
                type="file"
            />
            <label htmlFor={"file-upload"}>
                <Button
                    sx={{ height: "100%" }}
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}>
                    {title || "Upload"}
                </Button>
            </label>
        </>
    );
};

export default MediaUploader;
