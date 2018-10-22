import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { registerUser } from '../actions/authentication'
import classnames from 'classnames'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../styles'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirm: '',
      errors: {}
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    }
    this.props.registerUser(user, this.props.history)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/')
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  render() {
    const { errors } = this.state
    const { classes } = this.props

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Skapa konto
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="name">Användarnamn</InputLabel>
                <Input
                  id="name"
                  type="text"
                  onChange={this.handleInputChange}
                  name="name"
                  autoComplete="name"
                  autoFocus
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.name
                  })}
                  value={this.state.name}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Epost</InputLabel>
                <Input
                  id="email"
                  type="text"
                  onChange={this.handleInputChange}
                  name="email"
                  autoComplete="email"
                  autoFocus
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.email
                  })}
                  value={this.state.email}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Lösenord</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password
                  })}
                  onChange={this.handleInputChange}
                  value={this.state.password}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password_confirm">
                  Upprepa Lösenord
                </InputLabel>
                <Input
                  name="password_confirm"
                  type="password"
                  id="password_confirm"
                  autoComplete="current-password"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password_confirm
                  })}
                  onChange={this.handleInputChange}
                  value={this.state.password_confirm}
                />
                {errors.password_confirm && (
                  <div className="invalid-feedback">
                    {errors.password_confirm}
                  </div>
                )}
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Skapa
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(withStyles(styles)(Register)))
