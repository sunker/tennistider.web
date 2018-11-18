import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'

const createSliderWithTooltip = Slider.createSliderWithTooltip
const Range = createSliderWithTooltip(Slider.Range)

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
    const { classes, picker, model, onValueChange } = this.props
    const { startTime, endTime, active, index } = model
    const { min, max, step, label } = picker
    const style = {
      backgroundColor: '#f6f6f6',
      color: '#f6f6f6',
      border: '#ffa266',
      boxShadow: '#ffa266'
    }
    return (
      <div style={{ width: '100%' }}>
        <Range
          classes={{ container: classes.slider }}
          defaultValue={[startTime, endTime]}
          min={min}
          max={max}
          step={step}
          railStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.54);' }}
          handleStyle={{
            backgroundColor: '#f6f6f6',
            borderColor: '#ffa266'
          }}
          maximumTrackStyle={style}
          dotStyle={{
            backgroundColor: '#f6f6f6',
            borderColor: '#ffa266'
          }}
          onChange={value => onValueChange(value, index)}
          tipFormatter={value => `${value}`}
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
  picker: PropTypes.object.isRequired
}

export default withStyles(styles)(StepSlider)
