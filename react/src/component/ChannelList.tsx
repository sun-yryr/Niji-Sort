import React from 'react';
import { Grid, Box } from '@material-ui/core';
import ChannelCard from './ChannelCard';
import Spinner from './Spinner';
import SearchBox from './SearchBox';
import { Channel } from '../types';

interface Props {
    result: Channel[]
    changeQuery: () => void
}

export default (props: Props) => {
    const { result, changeQuery } = props;
    if (result.length === 0) return <Spinner />;
    return (
        <Box>
            <SearchBox changeQuery={changeQuery} />
            <Grid container direction="row" justify="space-around">
                {result.map((item) => <ChannelCard key={item.channelId} channel={item} />)}
            </Grid>
        </Box>
    );
};
