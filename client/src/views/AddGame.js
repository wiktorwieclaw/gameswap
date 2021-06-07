import {makeStyles} from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid";
import {Button, Checkbox, FormControlLabel, Paper, TextField} from "@material-ui/core";
import React, {useEffect, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import {getIdFromCookie} from '../auth';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh'
    },
    paper: {
        width: '70vw',
        height: '60vh'
    }
}));

export default function AddGame(props) {
    const classes = useStyles();

    const [imgUrl, setImgUrl] = useState('');
    const [name, setName] = useState('');
    const gameId = props.match.params.id;

    useEffect(() => {
        axios.get(`http://localhost:3001/game/byUserIdWithBoxArt/${gameId}`)
            .then(res => {
                setName(res.data.name);
                setImgUrl(res.data.imgUrl);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    function addToWantedToBuy() {
        console.log(getIdFromCookie());
        axios.post('http://localhost:3001/userBuyGame/create', {
            userId: getIdFromCookie(),
            gameId: gameId
        }).then(r => console.log(r))
            .catch(e => {
               console.log(e.message);
            });
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item>
                        <Typography variant='h3'>{name}</Typography>
                        <img src={imgUrl} alt={'No Cover'}/>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addToWantedToBuy}
                        >
                            Want to buy
                        </Button>
                        <Button variant="contained" color="primary">Want to sell</Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}