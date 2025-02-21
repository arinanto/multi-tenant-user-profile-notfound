import type { Access } from 'payload'
import { isSuperAdmin } from './isSuperAdmin'

export const isReadingMember: Access<Event> = (args) => {
  const { req } = args

  if (!req?.user) {
    return false
  }

  if (isSuperAdmin(args)) {
    return true
  }

  if (!req.user.departments || req.user.departments.length <= 0) {
    return false
  }

  const tenantIds = req.user.departments
    .map((d) => d.department)
    .filter((d) => d) // A bit paranoid, but just in case
    .map((d) => (typeof d === 'number' ? d : d.id))
    .filter((i) => typeof i === 'number') // More paranoid, just to be sure

  return { id: { in: tenantIds } }
}
