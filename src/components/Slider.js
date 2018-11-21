import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Slider from 'rc-slider'
import { Typography } from '@material-ui/core'
import 'rc-slider/assets/index.css'

const Range = Slider.Range

const styles = {
  root: {
    width: 300
  },
  slider: {
    padding: '22px 0px'
  }
}

class StepSlider extends React.Component {
  render() {
    const { classes, picker, model, onValueChange, label } = this.props
    const { startTime, endTime, index } = model
    const { min, max, step } = picker

    return (
      <div style={{ width: '100%', marginLeft: 24 }}>
        <Typography
          className={'slider-label'}
          style={{
            paddingBottom: 6,
            textAlign: 'right',
            color: model.active ? 'rgba(0, 0, 0, 0.87)' : '#D3D3D3'
          }}
        >
          {label}
        </Typography>
        <Range
          classes={{ container: classes.slider }}
          className={`${!model.active ? 'disabled' : ''}`}
          defaultValue={[startTime || min, endTime || max] || []}
          min={min}
          max={max}
          step={step}
          disabled={model.active ? false : true}
          onChange={value => onValueChange(value, index)}
        />
      </div>
    )
  }
}

StepSlider.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.array.isRequired,
  active: PropTypes.bool.isRequired,
  onValueChange: PropTypes.func.isRequired,
  picker: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
}

export default withStyles(styles)(StepSlider)
