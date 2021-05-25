import {makeStyles} from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid";
import {Card, TextField, Typography, useMediaQuery} from "@material-ui/core";
import LoggedInHeader from "../components/headers/LoggedInHeader";
import React, {useEffect, useState} from 'react';
import ListOfOffers from '../components/ListOfOffers.js';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from "@material-ui/core/Button";

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

    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

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
            <Grid item xs={11}>
                <Card className={classes.smallCard}>
                    <Typography>dupa</Typography>
                    <FormControl component="fieldset">
                        <RadioGroup value={value} onChange={handleChange}>
                            <TextField id="standard-basic" label="Name of the game" />
                            <Button variant="contained" color="primary">
                                Search
                            </Button>
                            <FormControlLabel value="buy" control={<Radio />} label="Buy" />
                            <FormControlLabel value="sell" control={<Radio />} label="Sell" />
                            <Button variant="contained" color="primary">
                                Submit
                            </Button>
                        </RadioGroup>
                    </FormControl>
                </Card>
            </Grid>
        </Grid>
    );
}