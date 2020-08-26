import { faInfoCircle, faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from 'emotion-theming'
import { darken, lighten, readableColor } from 'polished'
import React, { useMemo } from 'react'
import { Box, Flex, Text } from 'rebass'

const icons = {
  success: faCheckCircle,
  warning: faExclamationTriangle,
  danger: faExclamationTriangle
}

export const Message = ({ variant, text, sx, ...props }) => {
  const { colors } = useTheme()
  const background = colors[variant]

  const { color, backgroundLighter, backgroundDarker } = useMemo(() => ({
    color: readableColor(background),
    backgroundLighter: lighten(0.06, background),
    backgroundDarker: darken(0.06, background)
  }), [background])

  return (
    <Flex
      alignItems='center'
      sx={{
        py: 1,
        px: 2,
        color,
        bg: backgroundLighter,
        borderColor: backgroundDarker,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 1,
        ...sx
      }}
      {...props}
    >
      <Box mr={2}>
        <FontAwesomeIcon icon={icons[variant] ?? faInfoCircle}/>
      </Box>
      <Text
        sx={{}}
      >{text}</Text>
    </Flex>
  )
}
