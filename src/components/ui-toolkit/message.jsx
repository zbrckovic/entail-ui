import {
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Box, Flex, Text } from 'rebass'

export const Message = ({ variant = MessageVariant.NEUTRAL, text, sx, ...props }) => {
  const { icon, color, background, border } = variantData[variant]

  return (
    <Flex
      alignItems='center'
      sx={{
        py: 1,
        px: 2,
        color,
        bg: background,
        borderColor: border,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 1,
        ...sx
      }}
      {...props}
    >
      <Box mr={2}>
        <FontAwesomeIcon icon={icon} />
      </Box>
      <Text
        sx={{}}
      >{text}</Text>
    </Flex>
  )
}

export const MessageVariant = {
  NEUTRAL: 'NEUTRAL',
  SUCCESS: 'SUCCESS',
  DANGER: 'DANGER'
}

const variantData = {
  [MessageVariant.NEUTRAL]: {
    icon: faInfoCircle,
    color: 'onNeutralWidget',
    background: 'neutralWidget',
    border: 'neutralWidgetBorder'
  },
  [MessageVariant.SUCCESS]: {
    icon: faCheckCircle,
    color: 'onPrimaryWidget',
    background: 'primaryWidget',
    border: 'primaryWidgetBorder'
  },
  [MessageVariant.DANGER]: {
    icon: faExclamationTriangle,
    color: 'onDangerWidget',
    background: 'dangerWidget',
    border: 'dangerWidgetBorder'
  }
}
