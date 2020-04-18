import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(3)
    }
}))

export default (props) => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <p>近日公開予定です・。・</p>
        </Box>
    );
}