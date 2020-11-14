import { Button, Classes, Dialog } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import classnames from 'classnames'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { RootCtx } from 'contexts'
import { TermDependenciesGraph } from 'components/term-dependencies-graph'

export const GraphDialog = ({
  graph,
  isOpen,
  onClose,
  className,
  ...props
}) => {
  const { theme: { isDark } } = useContext(RootCtx)
  const { t } = useTranslation('DeductionEditor')

  return (
    <Dialog
      className={classnames({ [Classes.DARK]: isDark }, className)}
      title={t('graphDialog.title')}
      icon={IconNames.GRAPH}
      isOpen={isOpen}
      onClose={onClose}
      {...props}
    >
      <div className={Classes.DIALOG_BODY}>
        <TermDependenciesGraph graph={graph}/>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button
            title={t('graphDialog.close')}
            onClick={() => { onClose() }}
            icon={IconNames.DISABLE}
          >
            {t('graphDialog.close')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
