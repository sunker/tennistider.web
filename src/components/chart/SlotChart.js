import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { prettyDate } from '../../dateUtils'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const colors = [
  '#76B852',
  '#136071',
  '#d0922c',
  '#00787E',
  '#00907B',
  '#ffa266'
]

class SlotChart extends Component {
  render() {
    const { slots } = this.props
    const slotsByDays = _.groupBy(
      slots.sort(s => new Date(s.date).getTime()),
      s => `${new Date(s.date).getMonth()}${new Date(s.date).getDate()}`
    )

    const nextSevenDays = Object.keys(slotsByDays).slice(0, 7)
    const clubNames = _.uniq(
      _.flatten(nextSevenDays.map(d => slotsByDays[d].map(x => x.clubName)))
    )

    const data = nextSevenDays.reduce((acc, curr) => {
      const day = {
        name: prettyDate(new Date(slotsByDays[curr][0].date)),
        'Lediga tider': slotsByDays[curr].length,
        ...clubNames.reduce((acc, club) => {
          return {
            ...acc,
            [club]: slotsByDays[curr].filter(s => s.clubName === club).length
          }
        }, {})
      }
      return [...acc, day]
    }, [])

    return (
      <BarChart
        width={350}
        height={250}
        data={data}
        margin={{ right: 0, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend style={{ left: 30, right: 30 }} />
        {clubNames.map((c, i) => (
          <Bar key={i} dataKey={c} stackId="Lediga tider" fill={colors[i]} />
        ))}
      </BarChart>
    )
  }
}

SlotChart.propTypes = {
  slots: PropTypes.array.isRequired
}

export default SlotChart
