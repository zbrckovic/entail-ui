import {
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from 'emotion-theming'
import { darken } from 'polished'
import React, { useMemo } from 'react'
import { Box, Flex, Text } from 'rebass'

export const Message = ({ variant = MessageVariant.NEUTRAL, text, sx, ...props }) => {
  const { colors } = useTheme()

  const icon = icons[variant]

  const { color, bg, border } = useMemo(() => {
    const { color, bg } = determineColors(variant, colors)
    const border = darken(0.2, bg)

    return { color, bg, border }
  }, [variant, colors])

  return (
    <Flex
      alignItems='center'
      sx={{
        py: 1,
        px: 2,
        color,
        bg,
        borderColor: border,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 1,
        ...sx
      }}
      {...props}
    >
      <Box mr={2}>
        <FontAwesomeIcon icon={icon}/>
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

const icons = {
  [MessageVariant.NEUTRAL]: faInfoCircle,
  [MessageVariant.SUCCESS]: faCheckCircle,
  [MessageVariant.DANGER]: faExclamationTriangle
}

const determineColors = (variant, colors) => {
  switch (variant) {
    case MessageVariant.NEUTRAL:
      return {
        bg: colors.inputSurface,
        color: colors.onInputSurface
      }
    case MessageVariant.SUCCESS:
      return {
        bg: colors.success,
        color: colors.onSuccess
      }
    case MessageVariant.DANGER:
      return {
        bg: colors.danger,
        color: colors.onDanger
      }
  }
}
