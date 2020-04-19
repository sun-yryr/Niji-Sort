import React from 'react';
import Box from '@material-ui/core/Box';

import { Route } from 'react-router-dom';

import { withStyles, Theme } from '@material-ui/core/styles';
import ChannelList from '../component/ChannelList';

import * as API from '../actions/SunApi';
import VideoList from './VideoList';
import { Channel } from '../types';

const useStyles = (theme: Theme) => ({
    button: {
        margin: theme.spacing(3),
    },
});

interface State {
    status: boolean
    result: Channel[]
    filted: Channel[]
    load: boolean
    nowIndex: number
}

class Channels extends React.Component<{}, State> {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            result: [],
            filted: [],
            load: true,
            nowIndex: 0,
        };
        API.getChannelsList()
            .then((res) => {
                // ここ，ちゃんとnullはcatchで取れるようにする
                if (res) {
                    this.setState({ result: res });
                    this.setState({ filted: res });
                    this.setState({ status: true });
                    this.setState({ load: false });
                }
            });
        this.changeQuery = this.changeQuery.bind(this);
    }

    changeQuery() {
        const { result } = this.state;
        const filtedResult = result.filter((channle) => channle.title.toLowerCase().search(e.toLowerCase()) !== -1);
        this.setState({ filted: filtedResult });
    }

    render() {
        const { filted } = this.state;
        return (
            <Box>
                <Route exact path="/channel" render={() => <ChannelList result={filted} changeQuery={this.changeQuery} />} />
                <Route exact path="/channel/:channelId" component={VideoList} />
            </Box>
        );
    }
}

export default withStyles(useStyles)(Channels);
