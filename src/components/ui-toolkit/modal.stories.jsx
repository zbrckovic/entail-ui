import { Button } from 'components/ui-toolkit/button'
import { Modal } from 'components/ui-toolkit/modal'
import React, { useState } from 'react'
import { Text } from 'rebass'

export default {
  title: 'toolkit/Modal',
  component: Modal
}

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false)

  return <>
    <Text mb={2}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Text>
    <Button variant='primary' onClick={() => { setIsOpen(true) }}>
      Open
    </Button>
    <Modal isOpen={isOpen} p={4}>
      <Button variant='danger' onClick={() => setIsOpen(false)}>
        Close
      </Button>
    </Modal>
  </>
}
