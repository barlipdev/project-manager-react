import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from "react";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Toastr from '../../../utils/Toastr';
import { ProgressSpinner } from 'primereact/progressspinner';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" >
          BarDev Project Manager
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  

export default function Login() {
    const classes = useStyles();
    const [inLogin, setInLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const notifySuccess = (message) => Toastr.success(message);
    const notifyError = (message) => Toastr.error(message);

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        setInLogin(true);
        var body = {
            email: email,
            password: password
        }
        axios.post("http://51.68.139.166:8091/login",body,{})
        .then(response => {
            sessionStorage.setItem("token",response.data.authToken);
            sessionStorage.setItem("user",JSON.stringify(response.data.user));
            notifySuccess("Logged in !");
            window.location = "/home";
        })
        .catch(error => {
            notifyError(error);
            setInLogin(false);
        })
    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src='http://51.68.139.166/img/logo200.png'} height="200" className="p-mr-2"></img>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!validateForm()}
            style={{visibility: !inLogin ? 'visible' : 'hidden'}}
          >
            Sign In
          </Button>
          <ProgressSpinner style={{width: '50px', height: '50px', display: 'block', visibility: inLogin ? 'visible' : 'hidden'}} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s" disabled={true} />
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      
    </Container>
    
  );
  
}
