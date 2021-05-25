import {makeStyles} from "@material-ui/core/styles";
import {Button, Checkbox, FormControlLabel, Grid, Link, TextField} from "@material-ui/core";
import LoggedOutHeader from "../components/headers/LoggedOutHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import {login} from "../common"
import {useHistory} from "react-router";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fixes IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    toolbar: theme.mixins.toolbar
}))

export default function SignIn() {
    const history = useHistory();
    const classes = useStyles()
    const [errorMsg, setErrorMsg] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        login(email, password)
            .then(() => {
                history.push('/main');
            })
            .catch(err => {console.log(err); setErrorMsg(err.response.data)});
    }

    return (
        <Grid container direction={"column"}>
            <Grid item xs={12}>
                <LoggedOutHeader/>
                <div className={classes.toolbar}/>
                <br/>
            </Grid>
            <Grid item container justify={"center"}>
                <Grid item xs={0} sm={2}/>
                <Grid item xs={10} sm={4} md={3}>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}/>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Typography component="h2" variant="h6" color={'error'}>
                            { errorMsg }
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleSubmit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
                <Grid item xs={false} sm={2}/>
            </Grid>
        </Grid>
    )
}