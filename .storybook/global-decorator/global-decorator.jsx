import React from 'react'
import { RootWrapper } from '../../src/components/root-wrapper'

export const globalDecorator = storyFn => <RootWrapper>{storyFn()}</RootWrapper>
