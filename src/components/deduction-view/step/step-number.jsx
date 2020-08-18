import React from 'react'
import { Text } from 'rebass'

export const StepNumber = ({ number, ...props }) =>
  <Text fontFamily='mono' {...props}>
    {number}
  </Text>
