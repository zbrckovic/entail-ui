import { primitivePresentationCtx } from '@zbrckovic/entail-core/lib/presentation/sym-presentation/primitive-presentation-ctx'
import classNames from 'classnames'
import React from 'react'
import { SymPresentationCtxView } from './sym-presentation-ctx-view'

export default {
  title: 'SymPresentationCtxView',
  component: SymPresentationCtxView
}

export const Default = () =>
  <SymPresentationCtxView
    className={classNames('storybook-frame')}
    symPresentationCtx={primitivePresentationCtx}
  />

