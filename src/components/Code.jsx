import { css } from '@emotion/core'
import React from 'react'
import { Text } from 'rebass'

const Code = ({ className, children, ...props }) =>
  <Text
    as="pre"
    className={className}
    fontFamily='mono'
    css={css({
      display: 'inline-block',
      whiteSpace: 'pre'
    })}
    {...props}
  >
    {children ?? <wbr/>}
  </Text>

export default Code
