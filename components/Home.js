import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login } from "../store/actions";
import { makeStyles, TextField } from "@material-ui/core";
import ButtonContained from "./ButtonContained"
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
    btn:{
        marginTop: "40px"
    }
}))

function Home(props) {
const classes = useStyles()
  const router = useRouter()
  const [formError, setFormError] = useState({username:"", password:""})
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  function handleChange(e) {
    const { id, value } = e.target;
    let newForm = { ...form };
    newForm[id] = value;
    setForm(newForm);
    setFormError({username:"", password:""})
  }

  async function handleSubmit(e) {
    if(!form.username){
        setFormError({username:true})
        return
    }
    if(!form.password){
        setFormError({password:true})
        return
    }
    e.preventDefault();
    props.login(form);
  }

  useEffect(() => {
    if (props.auth.isLoggedIn) {
        router.push('/notes')
    }
  });


  return (
    <div className="App">
      <form className="form">
        <TextField
          required
          id="username"
          autoFocus
          autoComplete
          label="Username"
          value={form.username}
          variant="standard"
          onChange={handleChange}
          error={formError.username}
        />

        <TextField
          required
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          variant="standard"
          error={formError.password}
        />
        <ButtonContained text = "Log in" onClick={handleSubmit} className={classes.btn}/>

      </form>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    login: (payload) => {
      dispatch(login(payload));
    }
  };
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
