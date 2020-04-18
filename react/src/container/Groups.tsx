import React from 'react';
import Box from '@material-ui/core/Box';

import { Route } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import * as API from '../actions/SunApi';
import GroupList from '../component/GroupList';
import VideoList from './VideoList';

const useStyles = (theme) => ({
    button: {
        margin: theme.spacing(3),
    },
});

type State = {
    status: boolean
    result: any
    load: boolean
    nowIndex: number
}
type Props = {}

class Groups extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            status: false,
            result: [],
            load: true,
            nowIndex: 0,
        };
        API.getGroupsList()
            .then((res) => {
                // ここ，ちゃんとnullはcatchで取れるようにする
                if (res) {
                    this.setState({ result: res });
                    this.setState({ status: true });
                    this.setState({ load: false });
                }
            });
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
    }

    nextPage() {
        const { nowIndex, result } = this.state;
        if (nowIndex + 30 < result.length) {
            this.setState({ nowIndex: nowIndex + 30 });
            window.scrollTo(0, 0);
        }
    }

    prevPage() {
        const { nowIndex } = this.state;
        if (nowIndex - 30 >= 0) {
            this.setState({ nowIndex: nowIndex - 30 });
            window.scrollTo(0, 0);
        }
    }

    render() {
        const { result } = this.state;
        return (
            <Box>
                <Route exact path="/group" render={() => <GroupList result={result} />} />
                <Route exact path="/group/:groupName" component={VideoList} />
            </Box>
        );
    }
}

export default withStyles(useStyles)(Groups);
