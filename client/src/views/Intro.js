import {makeStyles} from '@material-ui/core/styles'
import {Card, CardActionArea, CardActions, Grid, Paper, Typography} from "@material-ui/core";
import LoggedOutHeader from "../components/headers/LoggedOutHeader";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    root: {
        minHeight: "100vh"
    },
    paper: {
        paddingTop: theme.spacing(20),
        paddingBottom: theme.spacing(20),
    },
    text: {
        fontSize: '3.2rem',
        [theme.breakpoints.down('xs')]:{
            fontSize: '2rem'
        }
    },
    card: {
        maxWidth: 600
    }

}))

export default function Intro() {
    const classes = useStyles();

    return (
        <Grid className={classes.root} container direction={"column"}>
            <Grid item xs={12}>
                <LoggedOutHeader/>
                <div className={classes.toolbar}/>
                <br/>
            </Grid>
            <Grid item container justify={"center"} style={{margin: "auto"}}>
                <Grid item xs={1}/>
                <Grid item xs={6}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    gameswap
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled
                                    it to make a type specimen book. It has survived not only five centuries,
                                    but also the leap into electronic typesetting, remaining essentially unchanged.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <NavLink to={"/login"} style={{textDecoration: "none"}}>
                                <Button size="small" color="primary">
                                    Sign In
                                </Button>
                            </NavLink>
                            <NavLink to={"/signup"} style={{textDecoration: "none"}}>
                                <Button size="small" color="primary">
                                    Sign Up
                                </Button>
                            </NavLink>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={5}/>
            </Grid>
                <Grid item xs={12}>
                    <br/>
                </Grid>
        </Grid>
    );
}