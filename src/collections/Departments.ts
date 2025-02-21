import { isReadingMember } from '@/access/isReadingMember'
import { isSuperAdmin } from '@/access/isSuperAdmin'
import type { CollectionConfig } from 'payload'

export const Departments: CollectionConfig = {
  slug: 'departments',
  admin: {
    useAsTitle: 'slug',
  },
  access: {
    create: isSuperAdmin,
    read: isReadingMember,
    update: isSuperAdmin,
    delete: isSuperAdmin,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
