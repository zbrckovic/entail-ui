import React, { useContext, useEffect, useReducer, useState } from 'react'
import { OrderDirection } from '../../models/order-direction'
import { RootCtx } from '../../contexts'
import { Cell, Column, Table, TableLoadingOption } from '@blueprintjs/table'
import { useTranslation } from 'react-i18next'
import style from './users-page.m.scss'
import { ResizeSensor } from '@blueprintjs/core'

export const UsersPage = () => {
  const { t } = useTranslation()
  const { usersService } = useContext(RootCtx)

  const [pageInfo, setPageInfo] = useState({ pageNumber: 0, pageSize: 10 })
  const [orderInfo, setOrderInfo] = useState({ orderProp: 'email', orderDir: OrderDirection.ASC })
  const [usersState, usersDispatch] = useReducer(usersReducer, { users: [], total: 0 })

  useEffect(() => {
    usersDispatch({ type: 'start' })

    usersService
      .getUsers({ ...pageInfo, ...orderInfo })
      .subscribe(({ items: users, total }) => {
        usersDispatch({ type: 'resolve', payload: { users, total } })
      })
  }, [usersService, pageInfo, orderInfo])

  const [tableSize, setTableSize] = useState({ width: 0, height: 0 })

  console.log(tableSize)

  return <ResizeSensor
    onResize={([{ contentRect: { width, height } }]) => { setTableSize({ width, height }) }}
  >
    <div className={style.root}>
      <Table
        style={tableSize}
        enableColumnResizing={false}
        columnWidths={[tableSize.width]}
        numRows={pageInfo.pageSize}
        loadingOptions={usersState.loading ? [TableLoadingOption.CELLS] : []}
      >
        <Column
          name={t('usersPage.emailLbl')}
          cellRenderer={
            i => <Cell>{usersState.users[i]?.email}</Cell>
          }
        />
      </Table>
    </div>
  </ResizeSensor>
}

const usersReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'start': {
      return { ...state, loading: true }
    }
    case 'resolve': {
      return payload
    }
  }
}
