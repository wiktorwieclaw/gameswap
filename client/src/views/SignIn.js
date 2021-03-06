import {Button, Checkbox, FormControlLabel, Grid, Link, TextField} from "@material-ui/core";
import Header from "../components/Header";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import {login} from "../auth"
import {useHistory} from "react-router";
import {useFormStyles} from "../styles";

export default function SignIn(props) {
    const history = useHistory();
    const classes = useFormStyles();
    const [errorMsg, setErrorMsg] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        login(email, password)
            .then(() => {
                props.setIsLoggedIn(true);
                history.push('/');
            })
            .catch(err => {setErrorMsg(err.response.data)});
    };

    return (
        <Grid container direction={"column"}>
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
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleSubmit}
                                type={'submit'}
                            >
                                Sign In
                            </Button>
                            <Grid container direction={"column"}>
                                <Grid item>
                                    <Link href="/signup">
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