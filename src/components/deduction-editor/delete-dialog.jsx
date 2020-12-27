import classnames from 'classnames'
import { RootCtx } from 'contexts'
import { useTranslation } from 'react-i18next'
import { Button, Classes, Dialog, Intent } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import React, { useContext } from 'react'

export const DeleteDialog = ({
  isOpen,
  onConfirm,
  onCancel,
  selectedSteps,
  className,
  ...props
}) => {
  const { theme: { isDark } } = useContext(RootCtx)
  const { t } = useTranslation()

  return (
    <Dialog
      className={classnames({ [Classes.DARK]: isDark }, className)} {...props}
      title={t('deductionEditor.deleteDialog.title')}
      icon={IconNames.WARNING_SIGN}
      isOpen={isOpen}
      onClose={onCancel}
    >
      <div className={Classes.DIALOG_BODY}>
        <p>{t('deductionEditor.deleteDialog.content', { step: Math.min(...selectedSteps) })}</p>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button
            title={t('yesLbl')}
            intent={Intent.DANGER}
            onClick={() => { onConfirm() }}
            icon={IconNames.CONFIRM}
          >
            {t('yesLbl')}
          </Button>
          <Button
            title={t('noLbl')}
            onClick={() => { onCancel() }}
            icon={IconNames.DISABLE}
          >
            {t('noLbl')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
