import React, { ChangeEvent } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { withStyles, Theme, WithStyles } from '@material-ui/core/styles';
import {
    Button, Grid, Box, Paper,
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import { SortKey } from '../container/VideoList';

const useStyles = (theme: Theme) => ({
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

interface Props extends WithStyles<typeof useStyles> {
    sortFilter: (key: SortKey, order: boolean) => void
}
interface State {
    sortKey: SortKey
    sortOrderDescending: boolean
}

class FilterBox extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            sortKey: 'Date',
            sortOrderDescending: true,
        };
        this.sort = this.sort.bind(this);
        this.toggleChange = this.toggleChange.bind(this);
    }

    sort() {
        const { sortFilter } = this.props;
        const { sortKey, sortOrderDescending } = this.state;
        sortFilter(sortKey, sortOrderDescending);
    }

    toggleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        // 悲しいなぁ
        this.setState({ sortKey: e.target.value as SortKey });
    }

    render() {
        const { classes } = this.props;
        const { sortKey, sortOrderDescending } = this.state;
        return (
            <Box className={classes.root}>
                <Paper>
                    <Grid container direction="column" justify="center" wrap="nowrap" className={classes.mainFlex}>
                        <Grid item xs>
                            <Box display="flex" flexDirection="row" justifyContent="flex-start">
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel htmlFor="outlined-age-native-simple">Key</InputLabel>
                                    <Select
                                        native
                                        value={sortKey}
                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => this.toggleChange(e)}
                                        labelWidth={30}
                                    >
                                        <option value="viewCount">再生回数</option>
                                        <option value="likeCount">高評価数</option>
                                        <option value="likeCountRate">高評価 / 全評価</option>
                                        <option value="commentCount">コメント数</option>
                                        <option value="Date">投稿日</option>
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel htmlFor="outlined-age-native-simple">Order</InputLabel>
                                    <Select
                                        native
                                        value={sortOrderDescending}
                                        onChange={(e) => this.setState({ sortOrderDescending: e.target.value === 'true' })}
                                        labelWidth={30}
                                    >
                                        <option value={false}>昇順</option>
                                        <option value>降順</option>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs className={classes.buttonFlex}>
                            <Button variant="outlined" color="secondary" onClick={this.sort}>そーと！</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        );
    }
}

export default withStyles(useStyles)(FilterBox);
