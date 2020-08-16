import { css } from '@emotion/core'
import { Textarea } from 'components/ui-toolkit/textarea'
import React from 'react'

export default {
  title: 'toolkit/Textarea',
  component: Textarea
}

export const Default = () =>
  <Textarea
    defaultValue='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pretium eu ipsum ac laoreet. Aenean nisi nisl, varius et imperdiet et, rhoncus in lorem. In vitae turpis vel mi mollis pharetra. Ut vel commodo mi. Nulla interdum vehicula libero, id mattis erat gravida in. Mauris quis nibh a eros scelerisque pharetra. Proin enim urna, ullamcorper ut lacus facilisis, volutpat pellentesque arcu. Praesent dignissim felis tristique turpis semper sagittis. Maecenas venenatis arcu at dui ullamcorper, at sodales neque feugiat. Donec accumsan, purus non varius sagittis, leo lorem tempor orci, eu imperdiet diam lacus non felis. Ut odio ipsum, elementum eu rutrum et, feugiat et ligula. Quisque a massa nec arcu condimentum bibendum. Cras vitae sem turpis. Integer nec tincidunt diam. Sed pulvinar dictum euismod.'
    rows={10}
    css={css({ resize: 'vertical' })}
  />
