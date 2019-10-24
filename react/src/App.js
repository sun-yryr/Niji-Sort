import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import Box from '@material-ui/core/Box';

import Analytics from 'react-router-ga';

import Header from './component/Header';
import MenuButton from './component/MenuButton';
import Home from './component/Home';
import Channels from './container/Channels';
import Groups from './container/Groups';
import VideoList from './container/VideoList';
import NotFound from './pages/404';

const pageData = [
    {title: "チャンネルの動画をソート", link: "/channel"},
    {title: "グループの動画をソート", link: "/group"},
    {title: "全ての動画をソート", link: "/all"},
    {title: "キーワードからソート", link: "/keyword"}
]

export default (props) => {
    return (
        <Box>
            <BrowserRouter>
                <Analytics id="UA-100427041-3" trackPathnameOnly>
                    <Route path="/" component={Header} />
                    <Route exact path="/" render={() => (
                        <Box display="flex" justifyContent="space-around" flexWrap="wrap">
                            {pageData.map((item, index) => <MenuButton key={index} data={item} />)}
                        </Box>    
                    )}/>
                    <Route exact path="/about" component={Home} />
                    <Route path="/channel" component={Channels} />
                    <Route path="/group" component={Groups} />
                    <Route path="/all" component={VideoList} />
                    <Route path="/keyword" component={NotFound} />
                </Analytics>
            </BrowserRouter>
        </Box>
    );
};
