import * as migration_20260928_061235_initial from './20260928_061235_initial';
import * as migration_20260928_080013_add_map_coordinates from './20260928_080013_add_map_coordinates';
import * as migration_20260928_080755_drop_variant_scent from './20260928_080755_drop_variant_scent';
import * as migration_20260928_082607_add_variants_unit from './20260928_082607_add_variants_unit';

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
    name: '20260928_082607_add_variants_unit'
  },
];
