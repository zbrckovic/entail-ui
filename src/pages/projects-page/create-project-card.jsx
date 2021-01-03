import React from 'react'
import { Button, Card, Intent } from '@blueprintjs/core'
import style from './create-project-card.m.scss'
import { IconNames } from '@blueprintjs/icons'
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'

export const CreateProjectCard = ({ onClick, className, ...props }) => {
  const { t } = useTranslation()

  return <Card
    className={classnames(style.root, className)}
    {...props}
  >
    <Button
      icon={IconNames.ADD}
      intent={Intent.PRIMARY}
      onClick={() => { onClick() }}
    >
      {t('projectsPage.createProjectLbl')}
    </Button>
  </Card>
}
