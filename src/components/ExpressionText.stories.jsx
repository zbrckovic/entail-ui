import { Kind } from '@zbrckovic/entail-core/lib/abstract-structures/sym'
import ExpressionText from 'components/ExpressionText'
import React from 'react'

export default {
  title: 'ExpressionText',
  component: ExpressionText,
  argTypes: {
    text: {
      control: 'text',
      defaultValue: 'p -> q'
    },
    kind: {
      control: {
        type: 'inline-radio',
        options: [Kind.Formula, Kind.Term]
      }
    }
  }
}

export const Default = args => <ExpressionText {...args}/>
