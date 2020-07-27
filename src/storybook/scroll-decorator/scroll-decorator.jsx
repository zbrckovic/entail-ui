import React from 'react'
import style from './scroll-decorator.module.scss'

export const scrollDecorator = storyFn =>
  <div className={style.container}>
    <div className={style['padded-frame']}>{storyFn()}</div>
  </div>
