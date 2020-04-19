import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Box from '@material-ui/core/Box';

// import Analytics from 'react-router-ga';

import Header from './component/Header';
import MenuButton from './component/MenuButton';
import Home from './component/Home';
import Channels from './container/Channels';
import Groups from './container/Groups';
import VideoList from './container/VideoList';
import NotFound from './pages/404';

const pageData = [
    { title: 'チャンネルの動画をソート', link: '/channel' },
    { title: 'グループの動画をソート', link: '/group' },
    { title: '全ての動画をソート', link: '/all' },
    { title: 'キーワードからソート', link: '/keyword' },
];

export default (props) => (
    <Box>
        <BrowserRouter>
            {/* <Analytics id="UA-100427041-3" trackPathnameOnly> */}
            <Route path="/" component={Header} />
            <Route
                exact
                path="/"
                render={() => (
                    <Box display="flex" justifyContent="space-around" flexWrap="wrap">
                        {pageData.map((item) => <MenuButton key={item.link} data={item} />)}
                    </Box>
                )}
            />
            <Route exact path="/about" component={Home} />
            <Route path="/channel" component={Channels} />
            <Route path="/group" component={Groups} />
            <Route path="/all" component={VideoList} />
            <Route path="/keyword" component={NotFound} />
            {/* </Analytics> */}
        </BrowserRouter>
    </Box>
);
