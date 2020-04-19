import React from 'react';
import {
    makeStyles, Card, CardActionArea, Typography, CardContent,
} from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    card: {
        width: '90%',
        height: '100px',
        margin: '10px',
        [theme.breakpoints.up('md')]: {
            width: '45%',
        },
    },
    media: {
        height: 'auto',
        width: '224px',
        margin: '0px 0px 7px',
    },
    actionArea: {
        height: '100%',
        width: '100%',
    },
    icon: {
        margin: '0px 5px',
        height: '30px',
    },
    divider: {
        margin: '7px 0px',
    },
    item: {
        margin: '7px 0px',
    },
    statistics: {
        height: '61px',
    },
}));

type Props = RouteComponentProps & {
    data: {
        title: string
        link: string
    }
};

export default withRouter((props: Props) => {
    const { title, link } = props.data;
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardActionArea className={classes.actionArea} onClick={() => props.history.push(link)}>
                <CardContent>
                    <Typography variant="button">{title}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
});
