import { RootCtx } from 'contexts/root-ctx'
import React, { useContext } from 'react'

export const DevInfo = () => {
  const { environment: { apiUrl, version, branch, development } } = useContext(RootCtx)

  return (
    <dl>
      <dt>Development</dt>
      <dd>{development}</dd>
      <dt>Api URL</dt>
      <dd>{apiUrl}</dd>
      <dt>Branch</dt>
      <dd>{branch}</dd>
      <dt>Commit</dt>
      <dd>{version}</dd>
    </dl>
  )
}
