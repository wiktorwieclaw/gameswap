import {makeStyles} from '@material-ui/core/styles'
import {Card, CardActions, Grid, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import {NavLink} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Header from "../components/Header";

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
        [theme.breakpoints.down('xs')]: {
            fontSize: '2rem'
        }
    },
    main: {
        margin: "auto",
        alignItems: "center",

    },
    card: {
        height: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    welcome: {
        height: "100%",
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "contain"
    }
}))

export default function Intro() {
    const classes = useStyles();

    return (
        <Grid className={classes.root} container direction={"column"}>
            <Grid item xs={12}>
                <Header/>
            </Grid>
            <Grid item container justify={"center"} className={classes.main}>
                <Grid item md={1} xs={0}/>
                <Grid item md={4} xs={8}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="h2">
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
                <Grid item md={1} xs={12}>
                    <br/>
                </Grid>
                <Grid item md={5} xs={10}>
                    <Container className={classes.welcome}>
                        <img
                            className={classes.image}
                            src={require("../images/welcome.svg").default}
                        />
                    </Container>
                </Grid>
                <Grid item md={1} xs={0}/>
            </Grid>
        </Grid>
    );
}