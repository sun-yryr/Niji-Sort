import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import {
    Button, Grid, Box, Paper,
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';

const useStyles = (theme) => ({
    root: {
        width: '80%',
        margin: '5px auto',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    mainFlex: {
        padding: '10px',
    },
    buttonFlex: {
        alignSelf: 'flex-end',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
    },
    button: {
        backgroundColor: red[500],

    },
});

class FilterBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortKey: 'Date',
            sortOrderDescending: true,
        };
        this.sort = this.sort.bind(this);
    }

    sort() {
        this.props.sortFilter(this.state.sortKey, this.state.sortOrderDescending);
    }

    render() {
        return (
            <Box className={this.props.classes.root}>
                <Paper>
                    <Grid container direction="column" justify="center" wrap="nowrap" className={this.props.classes.mainFlex}>
                        <Grid item xs>
                            <Box display="flex" flexDirection="row" justifyContent="flex-start">
                                <FormControl variant="outlined" className={this.props.classes.formControl}>
                                    <InputLabel htmlFor="outlined-age-native-simple">Key</InputLabel>
                                    <Select
                                        native
                                        value={this.state.sortKey}
                                        onChange={(e) => this.setState({ sortKey: e.target.value })}
                                        labelWidth={30}
                                    >
                                        <option value="viewCount">再生回数</option>
                                        <option value="likeCount">高評価数</option>
                                        <option value="likeCountRate">高評価 / 全評価</option>
                                        <option value="commentCount">コメント数</option>
                                        <option value="Date">投稿日</option>
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" className={this.props.classes.formControl}>
                                    <InputLabel htmlFor="outlined-age-native-simple">Order</InputLabel>
                                    <Select
                                        native
                                        value={this.state.sortOrderDescending}
                                        onChange={(e) => this.setState({ sortOrderDescending: e.target.value === 'true' })}
                                        labelWidth={30}
                                    >
                                        <option value={false}>昇順</option>
                                        <option value>降順</option>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs className={this.props.classes.buttonFlex}>
                            <Button variant="outlined" color="secondary" onClick={this.sort}>そーと！</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        );
    }
}

export default withStyles(useStyles)(FilterBox);
