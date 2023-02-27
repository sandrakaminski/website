import React from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


type MediaUploaderProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    title?: string;
    name?: string;
    variant?: 'text' | 'outlined' | 'contained';
}

const MediaUploader = (props: MediaUploaderProps): React.ReactElement => {
    const { title, variant } = props;


    return (
        <Box>
            <input
                {...props}
                accept="image/png, image/jpeg"
                style={{ display: 'none', }}
                id={"file-upload"}
                type="file"
            />
            <label htmlFor={'file-upload'}>
                <Button
                    sx={{ height: '100%' }}
                    variant={variant || 'outlined'}
                    component="span"
                    startIcon={<CloudUploadIcon />}
                >
                    {title || 'Upload'}
                </Button>
            </label>
        </Box>
    );
};

export default MediaUploader;