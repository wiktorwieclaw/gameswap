import {makeStyles} from '@material-ui/core/styles'
import LoggedInHeader from "../components/headers/LoggedInHeader";
import Offer from "../components/Offer"
import {Grid} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar
}))

export default function MainPage() {
    const classes = useStyles();

    return (
        <Grid container direction={"column"}>
            <Grid item xs={12}>
                <LoggedInHeader/>
                <div className={classes.toolbar}/>
                <br/>
            </Grid>
            <Grid item container justify={"center"}>
                <Grid item xs={0} sm={2}/>
                <Grid item container direction={"column"} alignItems={"center"} xs={12} sm={8} spacing={4}>
                    <Grid item sm={8}>
                        <Offer/>
                    </Grid>
                    <Grid item sm={8}>
                        <Offer/>
                    </Grid>
                    <Grid item sm={8}>
                        <Offer/>
                    </Grid>
                </Grid>
                <Grid item xs={0} sm={2}/>
            </Grid>
        </Grid>
    );
}