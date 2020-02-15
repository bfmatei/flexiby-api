import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class SnakeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName ? userSpecifiedName : snakeCase(targetName);
  }

  closureJunctionTableName(originalClosureTableName: string): string {
    return `${snakeCase(originalClosureTableName)}_closure`;
  }

  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    const prefixes = snakeCase(embeddedPrefixes.join('_'));
    const property = customName ? customName : snakeCase(propertyName);

    return `${prefixes}${property}`;
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  primaryKeyName(tableOrName: Table | string, columnNames: string[]): string {
    return super.primaryKeyName(tableOrName, columnNames);
  }

  uniqueConstraintName(tableOrName: Table | string, columnNames: string[]): string {
    return super.uniqueConstraintName(tableOrName, columnNames);
  }

  defaultConstraintName(tableOrName: Table | string, columnName: string): string {
    return super.defaultConstraintName(tableOrName, columnName);
  }

  foreignKeyName(tableOrName: Table | string, columnNames: string[]): string {
    return super.foreignKeyName(tableOrName, columnNames);
  }

  indexName(tableOrName: Table | string, columnNames: string[]): string {
    return super.indexName(tableOrName, columnNames);
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return snakeCase(`${relationName}_${referencedColumnName}`);
  }

  joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string
  ): string {
    return snakeCase(
      `${firstTableName}_${firstPropertyName.replace(/\./gi, '_')}_${secondTableName}`
    );
  }

  joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string {
    return snakeCase(`${tableName}_${columnName ? columnName : propertyName}`);
  }
}
