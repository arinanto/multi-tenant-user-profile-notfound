// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { Departments } from '@/collections/Departments'
import { Users } from '@/collections/Users'
import { Config } from '@/payload-types'
import { Media } from '@/collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Departments, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    multiTenantPlugin<Config>({
      collections: { media: {} },
      tenantsSlug: 'departments',
      tenantsArrayField: {
        arrayFieldName: 'departments',
        arrayTenantFieldName: 'department',
      },
      tenantField: {
        name: 'department',
      },
      userHasAccessToAllTenants: (user) => user.role === 'superadmin',
      useTenantsCollectionAccess: false,
    }),
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
