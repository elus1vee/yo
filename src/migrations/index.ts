import * as migration_20260928_061235_initial from './20260928_061235_initial';

export const migrations = [
  {
    up: migration_20260928_061235_initial.up,
    down: migration_20260928_061235_initial.down,
    name: '20260928_061235_initial'
  },
];
