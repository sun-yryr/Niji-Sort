import React from 'react';
import { makeStyles, Card, CardActionArea, Grid, Typography, CardContent, Divider, Box } from '@material-ui/core';
import { ThumbUpAlt, Comment, PlayArrow } from '@material-ui/icons';

import Pie from './PieChart'

const useStyles = makeStyles(theme => ({
    card: {
        width: "256px",
        margin: "10px"
    },
    media: {
        height: "auto",
        width: "224px",
        margin: "0px 0px 7px"
    },
    actionArea: {
        height: "100%",
        width: "100%"
    },
    icon: {
        margin: "0px 5px",
        height: "30px"
    },
    divider: {
        margin: "7px 0px"
    },
    item: {
        margin: "7px 0px"
    },
    statistics: {
        height: "61px"
    }
}));

export default (props) => {
    const classes = useStyles();
    const json = props.json;
    const likeCountRate = `${Math.floor(json.likeCountRate*1000)/10.0}%`;
    return (
        <Card className={classes.card}>
            <CardActionArea className={classes.actionArea} onClick={() => window.open("https://youtube.com/watch?v=" + json.id, "_blank")}>
                <CardContent>
                    <Box display="flex" flexDirection="column" justifyContent="space-bitween">
                        <img alt="Thumbnail" title={json.title} className={classes.media} src={json.thumbnailUrl}/>
                        <Typography variant="subtitle2">{json.title}</Typography>
                        <Divider className={classes.divider} variant="middle" />
                        <Box display="flex" flexDirection="row" className={classes.item} justifyContent="center">
                            <Grid container alignItems="center" justify="center">
                                <ThumbUpAlt className={classes.icon}/>
                                <Typography variant="caption">{json.likeCount}</Typography>
                            </Grid>
                            <Grid container alignItems="center" justify="center">
                                <Pie likeCount={json.likeCount} dislikeCount={json.dislikeCount} size={35}/>
                                <Typography variant="caption">{likeCountRate}</Typography>
                            </Grid>
                        </Box>
                        <Box display="flex" flexDirection="row" className={classes.item}>
                            <Grid container alignItems="center" justify="center">
                                <PlayArrow className={classes.icon}/>
                                <Typography variant="caption">{json.viewCount}</Typography>
                            </Grid>
                            <Grid container alignItems="center" justify="center">
                                <Comment className={classes.icon}/>
                                <Typography variant="caption">{json.commentCount}</Typography>
                            </Grid>
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
};