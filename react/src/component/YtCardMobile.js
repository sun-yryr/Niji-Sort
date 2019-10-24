import React from 'react';
import { makeStyles, Card, CardActionArea, Typography, CardContent, Divider, Box } from '@material-ui/core';
import { ThumbUpAlt, Comment, PlayArrow } from '@material-ui/icons';

import Pie from './PieChart'

const useStyles = makeStyles(theme => ({
    card: {
        width: "100%",
        margin: "10px"
    },
    media: {
        maxWidth: "150px",
        height: "auto",
        margin: "0px 0px 7px"
    },
    actionArea: {
        height: "100%",
        width: "100%"
    },
    icon: {
        margin: "5px 5px 4px",
        height: "20px"
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
                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                        <Box display="flex" flexDirection="row">
                            <Box>
                                <img title={json.title} alt="Thumbnail" className={classes.media} src={json.thumbnailUrl}/>
                            </Box>
                            <Box display="flex" flexDirection="row" justifyContent="space-around" flexGrow={1}>
                                {(!json.likeCount) ? null : (
                                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                        <ThumbUpAlt className={classes.icon}/>
                                        <Typography variant="caption">{json.likeCount}</Typography>
                                    </Box>
                                )}
                                {(!json.likeCount) ? null : (
                                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                        <Pie likeCount={json.likeCount} dislikeCount={json.dislikeCount} size={30}/>
                                        <Typography variant="caption">{likeCountRate}</Typography>
                                    </Box>
                                )}
                                {(!json.viewCount) ? null : (
                                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                        <PlayArrow className={classes.icon}/>
                                        <Typography variant="caption">{json.viewCount}</Typography>
                                    </Box>
                                )}
                                {(!json.commentCount) ? null : (
                                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                        <Comment className={classes.icon}/>
                                        <Typography variant="caption">{json.commentCount}</Typography>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                        <Divider className={classes.divider} variant="middle" />
                        <Typography variant="subtitle2">{json.title}</Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}