import { isReadingSefl } from '@/access/isReadingSelf'
import { isSuperAdmin } from '@/access/isSuperAdmin'
import { isSuperAdminOrSelf } from '@/access/isSuperAdminOrSelf'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: isSuperAdmin,
    read: isReadingSefl,
    update: isSuperAdminOrSelf,
    delete: isSuperAdmin,
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'role',
      type: 'select',
      defaultValue: 'user',
      options: ['superadmin', 'user'],
      required: true,
    },
  ],
}
