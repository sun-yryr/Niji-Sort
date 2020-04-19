import React from 'react';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { Button, Hidden } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';
import YtCard from '../component/YtCard';
import YtCardMobile from '../component/YtCardMobile';
import FilterBox from '../component/FilterBox';
import Spinner from '../component/Spinner';

import * as API from '../actions/SunApi';

const useStyles = (theme: Theme) => ({
    button: {
        margin: theme.spacing(3),
    },
});

class VideoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            result: [],
            load: true,
            nowIndex: 0,
        };
        const re = /^\/(\S+)\/(\S+)/;
        const tmpMatch = props.location.pathname.match(re);
        let option;
        if (tmpMatch) {
            option = { [tmpMatch[1]]: tmpMatch[2] };
        } else {
            option = { hoge: 'huga' };
        }
        API.getVideosList(option)
            .then((res) => {
                // ここ，ちゃんとnullはcatchで取れるようにする
                if (!res || res.length === 0) {
                    this.setState({ load: false });
                    alert('データがありません');
                } else {
                    this.setState({ result: res });
                    this.setState({ status: true });
                    this.setState({ load: false });
                }
            });
        this.sortFilter = this.sortFilter.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
    }

    sortFilter(Key, Order) {
        this.setState({ load: true });
        if (!this.state.status) {
            alert('先にchannelを検索してください');
            return;
        }
        const tmp_sorted = this.state.result.sort((a, b) => {
            if (Key === 'Date') {
                const A = moment(a.publishedAt, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
                const B = moment(b.publishedAt, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
                if (A.isAfter(B)) {
                    return (Order) ? -1 : 1;
                }
                return (Order) ? 1 : -1;
            }
            if (Order) {
                return (parseFloat(b[Key]) - parseFloat(a[Key]));
            }
            return (parseFloat(a[Key]) - parseFloat(b[Key]));
        });
        this.setState({ nowIndex: 0 });
        this.setState({ result: tmp_sorted });
        this.setState({ load: false });
    }

    nextPage() {
        if (this.state.nowIndex + 30 < this.state.result.length) {
            this.setState({ nowIndex: this.state.nowIndex + 30 });
            window.scrollTo(0, 0);
        }
    }

    prevPage() {
        if (this.state.nowIndex - 30 >= 0) {
            this.setState({ nowIndex: this.state.nowIndex - 30 });
            window.scrollTo(0, 0);
        }
    }

    render() {
        const { result, nowIndex } = this.state;
        return (
            <Box>
                {(this.state.load || result.length === 0) ? null : (
                    <FilterBox state={this.state} sortFilter={(Key, Order) => this.sortFilter(Key, Order)} />
                )}
                <Hidden xsDown>
                    <Grid container justify="space-around">
                        {(this.state.load) ? <Spinner /> : (result.slice(nowIndex, nowIndex + 30).map((item) => <YtCard key={item.id} json={item} />))}
                    </Grid>
                </Hidden>
                <Hidden smUp>
                    <Grid container justify="space-around">
                        {(this.state.load) ? <Spinner /> : (result.slice(nowIndex, nowIndex + 30).map((item) => <YtCardMobile key={item.id} json={item} />))}
                    </Grid>
                </Hidden>
                {(this.state.load || result.length === 0) ? null : (
                    <Box display="flex" justifyContent="space-between">
                        <Button className={this.props.classes.button} variant="outlined" onClick={this.prevPage}>前へ</Button>
                        <Button className={this.props.classes.button} variant="outlined" onClick={this.nextPage}>次へ</Button>
                    </Box>
                )}
            </Box>
        );
    }
}

export default withStyles(useStyles)(VideoList);
