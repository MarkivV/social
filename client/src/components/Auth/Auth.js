import React, {useEffect, useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container, TextField} from "@material-ui/core";

import useStyles from "./styles.js"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import Loginbtn from "./Loginbtn";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {signin, signup} from "../../actions/auth"

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const Auth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const classes = useStyles()
    const [isSignUp, setSignUp] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [formData, setFormData] = useState(initialState);
    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignUp) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
    }

    useEffect(() => {
        setFormData(initialState)
    }, [isSignUp]);

    const switchMode = () => {
        setSignUp(!isSignUp)
        setShowPass(false)
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleShowPassword = () =>{
        setShowPass(!showPass)
    };
    return (
        <Container component={"main"} maxWidth={"xs"}>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant={"h5"}>
                    {isSignUp ? "Sign Up" : "Sign In"}
                </Typography>
                <form className = {classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp &&  (
                                <>
                                    <Input name={"firstName"} label={"First Name"} handleChange={handleChange} autoFocus half/>
                                    <Input name={"lastName"} label={"Last Name"} handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name={"email"} label={"Email"} handleChange={handleChange} type={"email"}/>
                        <Input name={"password"} label={"Password"} handleChange={handleChange} type={showPass ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        {isSignUp && <Input name={"confirmPassword"} label={"Repeat password"} handleChange={handleChange} type={showPass ? "text" : "password"} handleShowPassword={handleShowPassword} />}
                    </Grid>

                    <Button type={"submit"} fullWidth variant={"contained"} color={"primary"} className={classes.submit}>{
                        isSignUp ? "Sign Up" : "Sign In"
                    }</Button>
                    <Loginbtn/>
                    <Grid container justifyContent={"flex-end"}>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {
                                    isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
