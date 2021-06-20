import React from 'react'
import {
  Button,
  Classes,
  Dialog,
  FormGroup, HTMLSelect,
  InputGroup,
  Intent,
  Switch,
  TextArea
} from '@blueprintjs/core'
import { useFormik } from 'formik'
import { Project, PropositionalRulesSet } from 'models/project'
import { useFormikUtil } from 'utils/use-formik-util'
import classnames from 'classnames'
import { useTranslation } from 'react-i18next'
import { IconNames } from '@blueprintjs/icons'
import validator from 'validator'
import style from './create-project-dialog.m.scss'
import { usePropositionalRulesSetDescriber } from './use-propositional-rules-set-describer'

export const CreateProjectDialog = ({ isOpen, onSubmit, onCancel, className }) => {
  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      isFirstOrder: true,
      propositionalRulesSet: PropositionalRulesSet.SPECIFIC_ONLY
    },
    validate: ({ name }) => {
      const errors = {}

      if (validator.isEmpty(name)) {
        errors.name = t('projectsPage.nameNotProvidedMsg')
      }

      return errors
    },
    onSubmit: (values) => {
      console.log(values)
      onSubmit(Project(values))
    }
  })

  const formikUtil = useFormikUtil(formik)
  const propositionalRulesSetDescriber = usePropositionalRulesSetDescriber()

  return <Dialog
    className={classnames(className)}
    isOpen={isOpen}
    onClose={() => { onCancel() }}
  >
    <div className={Classes.DIALOG_BODY}>
      <form onSubmit={formik.handleSubmit}>
        <FormGroup
          label={t('nameLbl')}
          labelFor='name'
          helperText={formikUtil.getError('name')}
          intent={formikUtil.getIntent('name')}
        >
          <InputGroup
            id='name'
            name='name'
            type='text'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            intent={formikUtil.getIntent('name')}
          />
        </FormGroup>
        <FormGroup
          label={t('descriptionLbl')}
          labelFor='description'
          helperText={formikUtil.getError('description')}
          intent={formikUtil.getIntent('description')}
        >
          <TextArea
            className={style.descriptionTextArea}
            rows={5}
            id='description'
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            intent={formikUtil.getIntent('description')}
          />
        </FormGroup>
        <FormGroup
          label={t('projectsPage.firstOrderLbl')}
          labelFor='isFirstOrder'
          helperText={formikUtil.getError('isFirstOrder')}
          intent={formikUtil.getIntent('isFirstOrder')}
        >
          <Switch
            id='isFirstOrder'
            name='isFirstOrder'
            checked={formik.values.isFirstOrder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            intent={formikUtil.getIntent('isFirstOrder')}
          />
        </FormGroup>
        <FormGroup
          label={t('projectsPage.propositionalRulesLbl')}
          labelFor='propositionalRulesSet'
          helperText={formikUtil.getError('propositionalRulesSet')}
          intent={formikUtil.getIntent('propositionalRulesSet')}
        >
          <HTMLSelect
            id='propositionalRulesSet'
            name='propositionalRulesSet'
            value={formik.values.propositionalRulesSet}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            intent={formikUtil.getIntent('propositionalRulesSet')}
          >
            {Object.values(PropositionalRulesSet).map(rulesSet =>
              <option key={rulesSet} value={rulesSet}>
                {propositionalRulesSetDescriber.describe(rulesSet)}
              </option>
            )}
          </HTMLSelect>
        </FormGroup>
      </form>
    </div>
    <div className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Button
          intent={Intent.PRIMARY}
          icon={IconNames.CONFIRM}
          title={t('submitLbl')}
          onClick={() => { formik.submitForm() }}
        >
          {t('submitLbl')}
        </Button>
        <Button
          icon={IconNames.DISABLE}
          title={t('cancelLbl')}
          onClick={() => { onCancel() }}
        >
          {t('cancelLbl')}
        </Button>
      </div>
    </div>
  </Dialog>
}
