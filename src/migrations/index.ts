import * as migration_20260925_142538_initial from './20260925_142538_initial';

export const migrations = [
  {
    up: migration_20260925_142538_initial.up,
    down: migration_20260925_142538_initial.down,
    name: '20260925_142538_initial'
  },
];
