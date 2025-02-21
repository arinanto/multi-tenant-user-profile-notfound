import type { Access } from 'payload'
import { isSuperAdmin } from './isSuperAdmin'

export const isReadingSefl: Access = (args) => {
  const { req } = args

  if (!req?.user) {
    return false
  }

  if (isSuperAdmin(args)) {
    return true
  }

  return {
    id: {
      equals: req.user.id,
    },
  }
}
