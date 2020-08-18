import React from 'react'
import { Text } from 'rebass'

export const StepNumber = ({ number, ...props }) =>
  <Text
    as='span'
    fontSize='small'
    {...props}
  >
    {number}
  </Text>
