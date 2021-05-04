import {makeStyles} from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid";
import {Card, Typography, useMediaQuery} from "@material-ui/core";
import LoggedInHeader from "../components/headers/LoggedInHeader";
import React, {useEffect, useState} from 'react';
import ListOfOffers from '../components/ListOfOffers.js';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    root: {
        width: "100vw"
    },
    smallCard: {
        width: "100%",
        height: "100%",
        padding: "1rem 2rem 2rem 2rem"
    }
}))

export default function Account(props) {
    const classes = useStyles();
    const isMobile = useMediaQuery('(max-width:600px)');
    const userId = props.match.params.id;

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    useEffect(() => {
        axios.get(`/user/id/${userId}`)
            .then(res => {
                const data = res.data;
                setName(data.name);
                setSurname(data.surname);
            })
            .catch(err => {
                console.log(err)
            })
    });

    return (
        <Grid container className={"root"} direction={"column"} alignItems={"center"}>
            <Grid item xs={12}>
                <LoggedInHeader/>
                <div className={classes.toolbar}/>
                <br/>
            </Grid>
            <Grid item container xs={11} direction={"row"} justify={"center"}>
                <Grid item container xs={12} sm={5} direction={"row"}>
                    <Grid item xs={12} style={{margin: "0 0 2rem 0"}}>
                        <Card className={classes.smallCard}>
                            <Typography>{name} {surname}</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.smallCard}>
                            <Typography>test2</Typography>
                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={5} style={isMobile ? {marginTop: "2rem"} : {marginLeft: "2rem"}}>
                    <ListOfOffers userId={userId}/>
                </Grid>
            </Grid>
        </Grid>
    );
}