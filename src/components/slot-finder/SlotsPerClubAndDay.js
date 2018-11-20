import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Badge from '../SimpleBadge'
import _ from 'lodash'

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',

    marginBottom: theme.spacing.unit
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  }
})

class SlotsPerClubAndDay extends Component {
  render() {
    let { slots, classes } = this.props
    const groups = _.groupBy(slots, s => s.startTime)
    return (
      <Grid style={{ marginTop: '2px' }} container spacing={16}>
        {Object.keys(groups).map((s, i) => (
          <Grid style={{ padding: '2px 4px' }} item xs={2} key={i}>
            <Paper className={classes.paper}>
              {s}
              <sup
                style={{
                  verticalAlign: 'text-top',
                  fontSize: '65%',
                  marginLeft: '1px'
                }}
              >
                {Number(s) > 9
                  ? Number(s)
                      .toFixed(2)
                      .toString()
                      .replace('.', '')
                      .substring(2, 4)
                  : Number(s)
                      .toFixed(2)
                      .toString()
                      .replace('.', '')
                      .substring(1, 3)}
              </sup>

              {groups[s].length > 1 && (
                <Badge
                  badgeContent={groups[s].length}
                  color="primary"
                  className={'slot-badge'}
                />
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    )
  }
}

SlotsPerClubAndDay.propTypes = {
  slots: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SlotsPerClubAndDay)
