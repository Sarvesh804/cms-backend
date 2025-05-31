/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('articles', {
        id: 'id',
        title: { type: 'TEXT', notNull: true },
        content: { type: 'TEXT', notNull: true },
        user_id: {
          type: 'INTEGER',
          references: '"users"',
          onDelete: 'CASCADE',
        },
        created_at: {
          type: 'TIMESTAMP',
          default: pgm.func('now()'),
        },
        updated_at: {
          type: 'TIMESTAMP',
          default: pgm.func('now()'),
        },
      });

      pgm.createIndex('articles', 'user_id');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('articles');
};
