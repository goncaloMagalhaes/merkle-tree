import React from 'react';
import { Typography, Box } from '@material-ui/core';

interface NodeProps {
    hash: string;
}

const Node = ({ hash }: NodeProps) => {

    return (
        <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
            <Typography variant='subtitle2'>{hash}</Typography>
        </Box>
    );
}

export default Node;