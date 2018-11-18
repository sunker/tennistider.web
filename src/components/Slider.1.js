// import React from 'react'
// import PropTypes from 'prop-types'
// import { withStyles } from '@material-ui/core/styles'
// import Slider from '@material-ui/lab/Slider'

// const styles = {
//   root: {
//     width: 300
//   },
//   slider: {
//     padding: '22px 0px'
//   }
// }

// class StepSlider extends React.Component {
//   render() {
//     const { classes, min, max, step, value, onValueChange } = this.props

//     return (
//       <div
//         style={{
//           padding: '22px 0px'
//         }}
//       >
//         <Slider
//           classes={{ container: classes.slider }}
//           value={value}
//           min={min}
//           max={max}
//           step={step}
//           onChange={onValueChange}
//         />
//       </div>
//     )
//   }
// }

// StepSlider.propTypes = {
//   classes: PropTypes.object.isRequired,
//   value: PropTypes.number.isRequired,
//   label: PropTypes.string.isRequired,
//   onValueChange: PropTypes.func.isRequired,
//   min: PropTypes.number.isRequired,
//   max: PropTypes.number.isRequired,
//   step: PropTypes.number.isRequired
// }

// export default withStyles(styles)(StepSlider)
