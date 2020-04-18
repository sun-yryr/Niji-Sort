import React from 'react';
import { Grid, Box } from '@material-ui/core';
import ChannelCard from './ChannelCard';
import Spinner from './Spinner';
import SearchBox from './SearchBox';


export default (props) => {
    if (!props.result) return null;
    return (
        <Box>
            <SearchBox changeQuery={props.changeQuery} />
            <Grid container direction="row" justify="space-around">
                {(props.result) ? (props.result.map(item => <ChannelCard key={item.channelId} json={item} />)) : <Spinner />}
            </Grid>
        </Box>
    );
};
