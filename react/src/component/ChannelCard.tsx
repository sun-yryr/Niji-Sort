import React from 'react';
import {
    Card, CardContent, Box, Typography, CardActionArea, Hidden,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { multByteStringSlice } from '../actions/SunApi';
import { Channel } from '../types';

const useStyles = makeStyles((theme) => ({
    card: {
        margin: '10px',
        width: 'auto',
        [theme.breakpoints.up('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.up('md')]: {
            width: '45%',
        },
        [theme.breakpoints.up('lg')]: {
            width: '600px',
        },
    },
    actionArea: {
        height: '100%',
        width: '100%',
    },
    media: {
        maxWidth: '100px',
        maxHeight: '100px',
    },
    textbox: {
        margin: '5px 10px',
    },
    xsTitle: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        width: '100px',
    },
}));

interface Props extends RouteComponentProps {
    channel: Channel
}

export default withRouter((props: Props) => {
    const classes = useStyles();
    const { channel } = props;
    return (
        <Card className={classes.card}>
            <CardActionArea className={classes.actionArea} onClick={() => props.history.push(`/channel/${channel.channelId}`)}>
                <CardContent>
                    <Hidden xsDown>
                        <Box display="flex">
                            <img alt={channel.title} className={classes.media} src={channel.thumbnailUrl} />
                            <Box className={classes.textbox} display="flex" flexDirection="column">
                                <Typography variant="h5">{channel.title}</Typography>
                                <Typography variant="caption">{multByteStringSlice(channel.description, 100)}</Typography>
                            </Box>
                        </Box>
                    </Hidden>
                    <Hidden smUp>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <img alt={channel.title} className={classes.media} src={channel.thumbnailUrl} />
                            <Typography variant="subtitle2" className={classes.xsTitle}>{channel.title}</Typography>
                        </Box>
                    </Hidden>
                </CardContent>
            </CardActionArea>
        </Card>
    );
});
