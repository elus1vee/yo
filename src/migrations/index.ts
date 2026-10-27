import * as migration_20260928_061235_initial from './20260928_061235_initial';
import * as migration_20260928_080013_add_map_coordinates from './20260928_080013_add_map_coordinates';
import * as migration_20260928_080755_drop_variant_scent from './20260928_080755_drop_variant_scent';
import * as migration_20260928_082607_add_variants_unit from './20260928_082607_add_variants_unit';
import * as migration_20260928_094456_add_wp_migration_fields from './20260928_094456_add_wp_migration_fields';
import * as migration_20260929_125159_add_decorative_images from './20260929_125159_add_decorative_images';
import * as migration_20261022_124524_drop_product_specs_and_subtitle from './20261022_124524_drop_product_specs_and_subtitle';
import * as migration_20261027_105415_add_product_order from './20261027_105415_add_product_order';

export const migrations = [
  {
    up: migration_20260928_061235_initial.up,
    down: migration_20260928_061235_initial.down,
    name: '20260928_061235_initial',
  },
  {
    up: migration_20260928_080013_add_map_coordinates.up,
    down: migration_20260928_080013_add_map_coordinates.down,
    name: '20260928_080013_add_map_coordinates',
  },
  {
    up: migration_20260928_080755_drop_variant_scent.up,
    down: migration_20260928_080755_drop_variant_scent.down,
    name: '20260928_080755_drop_variant_scent',
  },
  {
    up: migration_20260928_082607_add_variants_unit.up,
    down: migration_20260928_082607_add_variants_unit.down,
    name: '20260928_082607_add_variants_unit',
  },
  {
    up: migration_20260928_094456_add_wp_migration_fields.up,
    down: migration_20260928_094456_add_wp_migration_fields.down,
    name: '20260928_094456_add_wp_migration_fields',
  },
  {
    up: migration_20260929_125159_add_decorative_images.up,
    down: migration_20260929_125159_add_decorative_images.down,
    name: '20260929_125159_add_decorative_images',
  },
  {
    up: migration_20261022_124524_drop_product_specs_and_subtitle.up,
    down: migration_20261022_124524_drop_product_specs_and_subtitle.down,
    name: '20261022_124524_drop_product_specs_and_subtitle',
  },
  {
    up: migration_20261027_105415_add_product_order.up,
    down: migration_20261027_105415_add_product_order.down,
    name: '20261027_105415_add_product_order'
  },
];
