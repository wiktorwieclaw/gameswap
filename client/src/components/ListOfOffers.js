import {AppBar, Box, Card, List, ListItem, ListItemText, Tab, Tabs, Typography} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import theme from "../theme";
import Grid from "@material-ui/core/Grid";
import React, {useEffect} from "react";
import * as PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    root: {
        width: "100vw"
    },
    bigCard: {
        height: "80vh",
    },
}))

export default function ListOfOffers(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [gameList, setGameList] = React.useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };

    useEffect(() => {
        axios.get(`/game/byUserId/${props.userId}`)
            .then(res => {
                console.log(res.data);
                setGameList(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    });

    return (
        <div>
            <AppBar position="static" color="black">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="black"
                    variant="fullWidth"
                >
                    <Tab label="Buy"/>
                    <Tab label="Sell"/>
                </Tabs>
            </AppBar>
            <Card className={classes.bigCard}>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <List component={"nav"}>
                            {
                                gameList.map((elem, index) => {
                                    return (
                                    <ListItem button key={index}>
                                        <ListItemText primary={elem.name}/>
                                    </ListItem>
                                    );
                                })
                            }
                        </List>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <List component={"nav"}>
                            <ListItem button>
                                <ListItemText primary={"this too"}/>
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary={"this too"}/>
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary={"this too"}/>
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary={"this too"}/>
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary={"this too"}/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={"this too"}/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={"this too"}/>
                            </ListItem>
                        </List>
                    </TabPanel>
                </SwipeableViews>
            </Card>
        </div>
    )
}