import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { loadSlots } from '../../actions/slotFilter'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import { styles } from '../../styles'
import FilterIcon from '@material-ui/icons/FilterList'
import PropTypes from 'prop-types'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ClubFilter from '../filter/ClubFilter'
import SlotList from '../SlotList'
import Dialog from '../Dialog'
import Button from '@material-ui/core/Button'
import { filteredSlots } from '../../selectors'
import CircularProgress from '@material-ui/core/CircularProgress'

class SlotFinder extends Component {
  state = {
    open: false
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    }
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    })
  }

  handleClose = value => {
    this.setState({ selectedValue: value, open: false })
  }

  render() {
    const { classes, slots } = this.props
    return (
      <Paper className={classes.paper}>
        <ExpansionPanel
          style={{
            width: '100%'
          }}
          expanded={true}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FilterIcon className={classes.icon} style={{ marginRight: 6 }} />
              <Typography>Filter</Typography>
            </div>
          </ExpansionPanelSummary>
          <ClubFilter />
        </ExpansionPanel>
        {/* <Button onClick={this.handleClickOpen}>Open simple dialog</Button>
        <Dialog
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        /> */}
        <p>{slots.length} tider matchade dina val</p>
        {slots.length === 0 && (
          <React.Fragment>
            <CircularProgress />
            <p>Hämtar tider...</p>
          </React.Fragment>
        )}
        <SlotList slots={slots} />
      </Paper>
    )
  }
}

SlotFinder.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  slots: PropTypes.array.isRequired,
  loadSlots: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  slots: filteredSlots(state)
})

export default connect(
  mapStateToProps,
  { loadSlots }
)(withStyles(styles)(SlotFinder))
