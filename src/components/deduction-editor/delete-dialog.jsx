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
  const { t } = useTranslation('DeductionEditor')

  return (
    <Dialog
      className={classnames({ [Classes.DARK]: isDark }, className)} {...props}
      title={t('deleteDialog.title')}
      icon={IconNames.WARNING_SIGN}
      isOpen={isOpen}
      onClose={onCancel}
    >
      <div className={Classes.DIALOG_BODY}>
        <p>{t('deleteDialog.content', { step: Math.min(...selectedSteps) })}</p>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button
            title={t('deleteDialog.yes')}
            intent={Intent.DANGER}
            onClick={() => { onConfirm() }}
            icon={IconNames.CONFIRM}
          >
            {t('deleteDialog.yes')}
          </Button>
          <Button
            title={t('deleteDialog.no')}
            onClick={() => { onCancel() }}
            icon={IconNames.DISABLE}
          >
            {t('deleteDialog.no')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
