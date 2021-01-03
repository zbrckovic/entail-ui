import React, { useContext, useEffect, useReducer, useState } from 'react'
import { OrderDirection } from '../../models/order-direction'
import { RootCtx } from '../../contexts'
import { Cell, Column, ColumnHeaderCell, Table, TableLoadingOption } from '@blueprintjs/table'
import { useTranslation } from 'react-i18next'
import style from './users-page.m.scss'
import { HTMLSelect, Intent, Menu, MenuItem, ResizeSensor } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Pager } from '../../components/pager/pager'

const columns = ['email', 'createdAt']
const pageSizes = [25, 50, 100]

export const UsersPage = () => {
  const { t } = useTranslation()
  const { usersService } = useContext(RootCtx)

  const [pageInfo, setPageInfo] = useState({ pageNumber: 0, pageSize: pageSizes[0] })
  const [orderInfo, setOrderInfo] = useState({ orderProp: 'email', orderDir: OrderDirection.ASC })
  const [usersState, usersDispatch] = useReducer(usersReducer, { users: [], total: 0 })
  const pagesCount = Math.ceil(usersState.total / pageInfo.pageSize)

  useEffect(() => {
    usersDispatch({ type: 'start' })

    usersService
      .getUsers({ ...pageInfo, ...orderInfo })
      .subscribe(({ items: users, total }) => {
        usersDispatch({ type: 'resolve', payload: { users, total } })
      })
  }, [usersService, pageInfo, orderInfo])

  const [tableSize, setTableSize] = useState({ width: 0, height: 0 })

  const renderOrderMenu = i => <Menu>
    <MenuItem
      text={t('orderAscendingLbl')}
      icon={IconNames.SORT_ASC}
      onClick={() => { setOrderInfo({ orderDir: OrderDirection.ASC, orderProp: columns[i] }) }}
    />
    <MenuItem
      text={t('orderDescendingLbl')}
      icon={IconNames.SORT_DESC}
      onClick={() => { setOrderInfo({ orderDir: OrderDirection.DESC, orderProp: columns[i] }) }}
    />
  </Menu>

  return <ResizeSensor
    onResize={([{ contentRect: { width, height } }]) => { setTableSize({ width, height }) }}
  >
    <div className={style.root}>
      <div className={style.tableContainer}>
        <Table
          enableRowReordering={true}
          style={tableSize}
          enableColumnResizing={false}
          columnWidths={[tableSize.width - 160, 160]}
          numRows={pageInfo.pageSize}
          enableRowHeader={false}
          loadingOptions={usersState.loading ? [TableLoadingOption.CELLS] : []}
        >
          <Column
            name={t('usersPage.emailLbl')}
            columnHeaderCellRenderer={
              i => <ColumnHeaderCell
                name={t('usersPage.emailLbl')}
                menuIcon={IconNames.SORT}
                menuRenderer={renderOrderMenu}
              />
            }
            cellRenderer={i => {
              const user = usersState.users[i]
              if (user === undefined) return <Cell />

              return <Cell
                intent={user.isEmailVerified ? undefined : Intent.WARNING}>
                {user.email}
              </Cell>
            }}
          />
          <Column
            name={t('usersPage.createdAtLbl')}
            columnHeaderCellRenderer={
              i => <ColumnHeaderCell
                name={t('usersPage.createdAtLbl')}
                menuIcon={IconNames.SORT}
                menuRenderer={renderOrderMenu}
              />
            }
            cellRenderer={i => {
              const user = usersState.users[i]
              if (user === undefined) return <Cell />

              return <Cell>{user.createdAt.format('LLL')}</Cell>
            }}
          />
        </Table>
      </div>
      <div className={style.footer}>
        <Pager
          disabled={usersState.loading}
          pageNumber={pageInfo.pageNumber}
          onPageNumberChange={pageNumber => { setPageInfo({ ...pageInfo, pageNumber }) }}
          total={pagesCount}
        />
        <HTMLSelect
          value={pageInfo.pageSize}
          onChange={({ target: { value } }) => {
            setPageInfo({ ...pageInfo, pageSize: parseInt(value, 10) })
          }}>
          {pageSizes.map(pageSize => <option key={pageSize} value={pageSize}>{pageSize}</option>)}
        </HTMLSelect>
      </div>
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
