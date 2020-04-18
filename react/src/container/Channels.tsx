import React from 'react';
import Box from '@material-ui/core/Box';

import ChannelList from '../component/ChannelList';
import Route from 'react-router-dom/Route';

import { withStyles } from '@material-ui/core/styles';

import * as API from '../actions/SunApi';
import VideoList from './VideoList';

const useStyles = theme => ({
    button: {
        margin: theme.spacing(3)
    }
})

class Channels extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            result: [],
            filted: [],
            load: true,
            nowIndex: 0
        }
        API.getChannelsList()
            .then((res) => {
                // ここ，ちゃんとnullはcatchで取れるようにする
                if (res) {
                    this.setState({result: res});
                    this.setState({filted: res});
                    this.setState({status: true});
                    this.setState({load: false});
                }
            })
        this.changeQuery = this.changeQuery.bind(this);
    }

    changeQuery(e) {
        const update_result = this.state.result.filter(value => {
            return value.title.toLowerCase().search( e.toLowerCase()) !== -1;
        });
        this.setState({filted: update_result});
    }

    render() {
        const { filted } = this.state
        return (
            <Box>
                <Route exact path="/channel" render={() => <ChannelList result={filted} changeQuery={this.changeQuery}/>} />
                <Route exact path="/channel/:channelId" component={VideoList} />
            </Box>
        );
    }
}

export default withStyles(useStyles)(Channels);