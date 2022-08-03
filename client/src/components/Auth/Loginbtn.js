import React from 'react';
import {GoogleLogin} from "react-google-login";
import {Button} from "@material-ui/core";
import Icon from "./Icon";
import useStyles from "./styles.js"
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';


const Loginbtn = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const googleSuccess = async (res) =>{
        const  result = res?.profileObj
        const  token = res?.tokenId
        try {
            dispatch({type: "AUTH", data: {result, token}})
            navigate("/")
        }catch(error){
            console.log(error)
        }
    };
    const googleFailure = (error) =>{
        console.log(error)
        console.log("Google sign in was unsuccessful. Try again later")
    };
    return (
        <div>
            <GoogleLogin
                clientId={"955883786661-lv93h8408pqd7iunduitb77p015ctn6s.apps.googleusercontent.com"}
                render={(renderProps)=>(<Button className={classes.googleButton}
                color={"primary"}
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon/>}
                variant={"contained"}>
                    Google Sign In
                </Button>)}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy={"single_host_origin"}
            />
        </div>
    );
};

export default Loginbtn;
