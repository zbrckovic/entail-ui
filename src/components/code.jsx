import { css } from '@emotion/core'
import React from 'react'
import { Text } from 'rebass'

export const Code = ({ className, children }) =>
  <Text
    className={className}
    fontFamily='mono'
    css={css({
      display: 'inline-block',
      whiteSpace: 'pre'
    })}
  >
    {children ?? <wbr/>}
  </Text>
