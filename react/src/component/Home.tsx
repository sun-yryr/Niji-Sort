import React from 'react';
import Box from '@material-ui/core/Box';
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    root: {
        width: "80%",
        margin: "50px auto 0px"
    },
    faqItem: {
        margin: "5px 0px"
    }
}));

const faq = (props, classes) => {
    return (
        <Box className={classes.faqItem}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant="body1">{props[0]}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography variant="body1">{props[1]}</Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Box>
    );
}

const FAQList = [
    ["なんのために作ったの？", "新しいVを調べるときに，高評価順等でソートした方が探しやすかったから"],
    ["なにができるの？", "Youtubeのチャンネルを検査して，ソートできます（そのうちフィルターもつけます）"],
    ["誰が作ったの？", "＠taittide です"],
    ["うまく動かないんだけど", "Twitterで @taittide に連絡してください"],
    ["ご意見箱", "こちらです → https://marshmallow-qa.com/taittide"]
]

export default (props) => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Typography variant="title1">サイトの説明</Typography>
            <Box display="flex" flexDirection="column">
                {FAQList.map(item => faq(item, classes))}
            </Box>
        </Box>
    );
}