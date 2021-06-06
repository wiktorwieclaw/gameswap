import React, {useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import {useHistory} from "react-router";
import {NavLink} from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {Divider, List, ListItem, ListItemText} from "@material-ui/core";
import {getIdFromCookie, logout} from '../auth'
import axios from "axios";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    titleLink: {
        textDecoration: "none",
        color: "black"
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    loggedIn: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center"
    },
    toolbar: theme.mixins.toolbar,
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    clearIndicator: {
        color: 'black'
    },
    popupIndicator: {
        color: 'black'
    }
}));

export default function Header(props) {
    const id = getIdFromCookie();

    const isLoggedIn = id !== undefined;
    const classes = useStyles();
    const history = useHistory();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [searchText, setSearchText] = useState("");
    const [foundTitles, setFoundTitles] = useState([]);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = () => {
        history.push(`/account/${id}`);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const setSearchTextWithAutocomplete = text => {
        setSearchText(text);
        axios.get(
            `http://localhost:3001/game/title/${text}`
        ).then(res => {
            console.log(res.data);
            setFoundTitles(res.data);
        });
    }

    const menuId = 'primary-search-account-menu';

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <NavLink to={'/'} className={classes.titleLink}>
                        <Typography className={classes.title} variant="h6" noWrap>
                            gameswap
                        </Typography>
                    </NavLink>
                    {
                        isLoggedIn ?
                            <div className={classes.loggedIn}>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon/>
                                    </div>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={foundTitles}
                                        getOptionLabel={(option) => option.name}
                                        style={{width: '20ch'}}
                                        classes={{
                                            clearIndicatorDirty: classes.clearIndicator,
                                            popupIndicator: classes.popupIndicator
                                        }}
                                        renderInput={params => {
                                            const {InputLabelProps, InputProps, ...rest} = params;

                                            return <InputBase
                                                placeholder="Search…"
                                                classes={{
                                                    root: classes.inputRoot,
                                                    input: classes.inputInput,
                                                }}
                                                value={searchText}
                                                onChange={e => setSearchTextWithAutocomplete(e.target.value)}
                                                {...params.InputProps} {...rest}
                                            />
                                        }}
                                    />
                                </div>
                                <div className={classes.sectionDesktop}>
                                    <IconButton
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                </div>
                                <div className={classes.sectionMobile}>
                                    <IconButton
                                        aria-label="show more"
                                        aria-controls={mobileMenuId}
                                        aria-haspopup="true"
                                        onClick={handleMobileMenuOpen}
                                        color="inherit"
                                    >
                                        <MoreIcon/>
                                    </IconButton>
                                </div>
                            </div>
                            :
                            <div/>
                    }
                </Toolbar>
            </AppBar>
            <div style={{paddingBottom: "25px"}}/>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={isDrawerOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem button>
                        <ListItemText primary={'About Us'}/>
                    </ListItem>
                    {
                        isLoggedIn ?
                            <ListItem button onClick={() => {
                                props.setIsLoggedIn(false);
                                setIsDrawerOpen(false);
                                logout().then(() => {
                                    history.push('/');
                                });
                            }}>
                                <ListItemText primary={'Logout'}/>
                            </ListItem> : <div/>
                    }
                </List>
            </Drawer>
            {renderMobileMenu}
        </div>
    );
}