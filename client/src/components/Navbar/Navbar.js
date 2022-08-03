 import React, {useEffect, useState} from 'react';
import {AppBar, Avatar, Button, Toolbar, Typography} from "@material-ui/core";
import memories from "../../images/memories.png";
import useStyles from './styles'
import {Link, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';
import decode from "jwt-decode"


 const Navbar = () => {
     const classes = useStyles();
     const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
     const dispatch = useDispatch()
     const navigate = useNavigate()
     const location = useLocation()

     const logout = () =>{
         dispatch({type: "LOGOUT"})
         navigate("/auth")
         setUser( null)
     }

    useEffect(() => {
        const token = user?.token
        if(token){
            const decoded = decode(token)

            if(decoded.exp * 1000 < new Date().getTime()){
                logout()
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);



    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <img className={classes.image} src={memories} alt={"icon"} height={"45"}/>
            </div>
            <Toolbar className={classes.toolbar}>
                {
                   user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant={"h6"}>
                            {user.result.name}
                        </Typography>
                        <Button variant={"contained"} className={classes.logout} color={"secondary"} onClick={logout}>
                            Logout
                        </Button>
                    </div>
                   ) : (
                       <Link to="/auth">
                       <Button variant={"contained"}  color={"primary"}>
                           Sign In
                       </Button>
                       </Link>
                   )
                }
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
