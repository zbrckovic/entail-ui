import React from 'react'
import { Card, Classes, Text } from '@blueprintjs/core'
import classnames from 'classnames'
import style from './project-card.m.scss'
import { useTranslation } from 'react-i18next'
import { usePropositionalRulesSetDescriber } from './use-propositional-rules-set-describer'

export const ProjectCard = ({ project, className, ...props }) => {
  const { t } = useTranslation()

  const propositionalRulesSetDescriber = usePropositionalRulesSetDescriber()

  return <Card interactive {...props}>
    <div className={classnames(style.header)}>
      <Text
        className={classnames(Classes.HEADING, style.title)}
        title={project.name}
        ellipsize
      >
        {project?.name}
      </Text>
      {
        project.isFirstOrder &&
        <strong
          className={style.firstOrderBadge}
          title={t('projectsPage.firstOrderLbl')}
        >
          {t('projectsPage.firstOrderAbbreviatedLbl')}
        </strong>
      }
    </div>
    <div className={style.body}>
      <div className={style.propositionalRules}>
        <Text title={t('projectsPage.propositionalRulesLbl')}>
          {propositionalRulesSetDescriber.describe(project.propositionalRulesSet)}
        </Text>
      </div>
      <p className={Classes.TEXT_MUTED}>{project?.description}</p>
    </div>
  </Card>
}
