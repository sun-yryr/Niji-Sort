import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(2),
    },
    root: {
        margin: "5px auto"
    }
}));

export default (props) => {
    const classes = useStyles();

    return (
        <div>
            <CircularProgress className={classes.progress} color="primary"/>
            <Typography variant="subtitle1">読み込み中</Typography>
        </div>
    );
}