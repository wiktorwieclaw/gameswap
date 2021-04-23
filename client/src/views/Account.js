import {makeStyles} from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid";
import {AppBar, Box, Card, List, ListItem, ListItemText, Tab, Tabs, Typography} from "@material-ui/core";
import LoggedInHeader from "../components/headers/LoggedInHeader";
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import theme from "../theme";
import * as PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    root: {
      width: "100vw"
    },
    bigCard: {
        height: "90vh",
    },
    smallCard: {
        height: "25vh",
        top: "40px",
        bottom: "40px"
    }
}))

function TabPanel(props) {
    const { children, value, index, ...other } = props;

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

export default function Account() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Grid container className={"root"} direction={"column"} alignItems={"center"}>
            <Grid item xs={12}>
                <LoggedInHeader/>
                <div className={classes.toolbar}/>
                <br/>
            </Grid>
            <Grid item container xs={12} direction={"row"} justify={"space-evenly"}>
                <Grid item xs={5}>
                    <AppBar position="static" color="primary">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            textColor="black"
                            variant="fullWidth"
                        >
                            <Tab label="Buy"  />
                            <Tab label="Sell"  />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            Item One
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            Item Two
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                            Item Three
                        </TabPanel>
                    </SwipeableViews>
                    {/*<Card className={classes.bigCard}>*/}
                    {/*    <List component={"nav"}>*/}
                    {/*        <ListItem button>*/}
                    {/*            <ListItemText primary={"i hate this"}/>*/}
                    {/*        </ListItem>*/}
                    {/*        <ListItem button>*/}
                    {/*            <ListItemText primary={"i hate this"}/>*/}
                    {/*        </ListItem>*/}
                    {/*        <ListItem button>*/}
                    {/*            <ListItemText primary={"i hate this"}/>*/}
                    {/*        </ListItem>*/}
                    {/*        <ListItem button>*/}
                    {/*            <ListItemText primary={"i hate this"}/>*/}
                    {/*        </ListItem>*/}
                    {/*        <ListItem button>*/}
                    {/*            <ListItemText primary={"i hate this"}/>*/}
                    {/*        </ListItem>*/}
                    {/*        <ListItem>*/}
                    {/*            <ListItemText primary={"i hate this"}/>*/}
                    {/*        </ListItem>*/}
                    {/*        <ListItem>*/}
                    {/*            <ListItemText primary={"i hate this"}/>*/}
                    {/*        </ListItem>*/}
                    {/*    </List>*/}
                    {/*</Card>*/}
                </Grid>
                <Grid item container xs={5} direction={"column"} alignItems={"center"} spacing={2} justify={"space-between"}>
                    <Grid item xs={12}>
                        <Card className={classes.smallCard}>
                            <Typography>test1</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.smallCard}>
                            <Typography>test2</Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}