import { useTranslation } from 'react-i18next'
import { Button, Classes, Dialog, Intent } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import React from 'react'

export const DeleteDialog = ({ isOpen, onConfirm, onCancel, selectedSteps }) => {
  const { t } = useTranslation('DeductionEditor')

  return (
    <Dialog
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
            intent={Intent.PRIMARY}
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