import React from 'react';

import { Box, InputBase, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    root: {
        width: "80%",
        height: "50px",
        margin: "10px auto",
        border: "solid thin #333333",
        backgroundColor: "#ffffff",
        borderRadius: "5px",
        display: "flex",
        alignItems: "stretch"
    },
    input: {
        margin: "0px 10px",
        fontSize: "20px",
        flexGrow: 1
    },
    button: {
        backgroundColor: "#eeeeee",
        padding: "0px 20px",
        flexGrow: 0
    }
}))

export default (props) => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="チャンネルを検索"
                onChange={e => props.changeQuery(e.target.value)}
            />
            <ButtonBase className={classes.button}>
                <SearchIcon/>
            </ButtonBase>
        </Box>
    );
}