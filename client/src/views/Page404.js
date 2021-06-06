import Button from '@material-ui/core/Button'
import Home from '@material-ui/icons/Home'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: `100%`,
    },
    paper: {
        backgroundColor: theme.palette.background.default,
        margin: 0,
        height: `calc(100vh - 64px)`,
    }
}));

export default function PageNotFound() {
    const classes = useStyles()

    return (
        <div className={classes.paper}>
            <div className={classes.container}>
                <Typography variant="h1">404</Typography>
                <Typography variant="h4">Page does not exist.</Typography>
            </div>
        </div>
    )
}