import React from 'react';
import {
    Grid, Box, makeStyles, Card, CardContent, CardActionArea, Typography,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Spinner from './Spinner';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(3),
    },
    actionArea: {
        height: '100%',
        width: '100%',
    },
    card: {
        margin: theme.spacing(1),
        height: '90px',
        width: '95%',
        [theme.breakpoints.up('sm')]: {
            width: '45%',
        },
        [theme.breakpoints.up('md')]: {
            width: '30%',
        },
    },
}));

export default withRouter((props) => {
    const classes = useStyles();
    if (!props.result) return null;
    return (
        <Box>
            <Grid container direction="row" justify="space-around">
                {(props.result) ? (props.result.map((item) => (
                    <Card className={classes.card}>
                        <CardActionArea className={classes.actionArea} onClick={() => props.history.push(`/group/${item.groupName}`)}>
                            <CardContent>
                                <Typography variant="body1">{item.groupName}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))) : <Spinner />}
            </Grid>
        </Box>
    );
});
