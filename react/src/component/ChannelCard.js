import React from 'react';
import { Card, CardContent, Box, Typography, CardActionArea, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withRouter from 'react-router-dom/withRouter';

import * as API from '../actions/SunApi';

const useStyles = makeStyles(theme => ({
    card: {
        margin: "10px",
        width: "auto",
        [theme.breakpoints.up('sm')]: {
            width: "100%",
        },
        [theme.breakpoints.up('md')]: {
            width: "45%",
        },
        [theme.breakpoints.up('lg')]: {
            width: "600px",
        },
    },
    actionArea: {
        height: "100%",
        width: "100%"
    },
    media: {
        maxWidth: "100px",
        maxHeight: "100px",
    },
    textbox: {
        margin: "5px 10px"
    },
    xsTitle: {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        width: "100px"
    }
}))

export default withRouter((props) => {
    const classes = useStyles();
    const json = props.json;
    return (
        <Card className={classes.card}>
            <CardActionArea className={classes.actionArea} onClick={() => props.history.push("/channel/"+json.channelId)}>
                <CardContent>
                    <Hidden xsDown>
                        <Box display="flex">
                            <img alt={json.title} className={classes.media} src={json.thumbnailUrl} />
                            <Box className={classes.textbox} display="flex" flexDirection="column">
                                <Typography variant="h5">{json.title}</Typography>
                                <Typography variant="caption">{API.multByteStringSlice(json.description, 100)}</Typography>
                            </Box>
                        </Box>
                    </Hidden>
                    <Hidden smUp>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <img alt={json.title} className={classes.media} src={json.thumbnailUrl} />
                            <Typography variant="subtitle2" className={classes.xsTitle}>{json.title}</Typography>
                        </Box>
                    </Hidden>
                </CardContent>
            </CardActionArea>
        </Card>
    );
})