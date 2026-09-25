import * as migration_20260829_130004_initial_schema from './20260829_130004_initial_schema'
import * as migration_20260830_230000_listing_and_crsp_specs from './20260830_230000_listing_and_crsp_specs'
import * as migration_20260830_231000_private_dealer_verification_documents from './20260830_231000_private_dealer_verification_documents'
import * as migration_20260904_000000_align_crsp_with_kra_source from './20260904_000000_align_crsp_with_kra_source'
import * as migration_20260910_000000_seo_fields from './20260910_000000_seo_fields'
import * as migration_20260910_010000_editorial_content from './20260910_010000_editorial_content'
import * as migration_20260911_210000_first_party_analytics from './20260911_210000_first_party_analytics'
import * as migration_20260925_100000_auctions_and_bazaars from './20260925_100000_auctions_and_bazaars'

export const migrations = [
  {
    up: migration_20260829_130004_initial_schema.up,
    down: migration_20260829_130004_initial_schema.down,
    name: '20260829_130004_initial_schema',
  },
  {
    up: migration_20260830_230000_listing_and_crsp_specs.up,
    down: migration_20260830_230000_listing_and_crsp_specs.down,
    name: '20260830_230000_listing_and_crsp_specs',
  },
  {
    up: migration_20260830_231000_private_dealer_verification_documents.up,
    down: migration_20260830_231000_private_dealer_verification_documents.down,
    name: '20260830_231000_private_dealer_verification_documents',
  },
  {
    up: migration_20260904_000000_align_crsp_with_kra_source.up,
    down: migration_20260904_000000_align_crsp_with_kra_source.down,
    name: '20260904_000000_align_crsp_with_kra_source',
  },
  {
    up: migration_20260910_000000_seo_fields.up,
    down: migration_20260910_000000_seo_fields.down,
    name: '20260910_000000_seo_fields',
  },
  { up: migration_20260910_010000_editorial_content.up, down: migration_20260910_010000_editorial_content.down, name: '20260910_010000_editorial_content' },
  { up: migration_20260911_210000_first_party_analytics.up, down: migration_20260911_210000_first_party_analytics.down, name: '20260911_210000_first_party_analytics' },
  {
    up: migration_20260925_100000_auctions_and_bazaars.up,
    down: migration_20260925_100000_auctions_and_bazaars.down,
    name: '20260925_100000_auctions_and_bazaars',
  },
]