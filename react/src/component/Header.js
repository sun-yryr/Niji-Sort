import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import ButtonBase from '@material-ui/core/ButtonBase';
import withRouter from 'react-router-dom/withRouter';

const useStyles = makeStyles(theme => ({
    grow: {
        width: "100%"
    },
    appber: {
        backgroundColor: red[500]
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    search: {
        border: "thin solid",
        borderColor: grey[50],
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    button: {
        backgroundColor: 'inherit',
        color: 'inherit'
    }
}));

export default withRouter((props) => {
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.appber}>
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => props.history.push("/")}
                >
                    <HomeIcon />
                </IconButton>
                <ButtonBase disableTouchRipple={true} onClick={() => props.history.push("/")}>
                    <Typography variant="h6" noWrap>
                        にじそーと
                    </Typography>
                </ButtonBase>
            </Toolbar>
        </AppBar>
    );
})