import type { ColumnConfig, GroupedColumns } from '@dua-upd/types-common';
import { I18nService } from '@dua-upd/upd/i18n';

export interface ConfigContext<T> {
  i18n: I18nService;
  data: T[];
  field: keyof T;
}

export function createCategoryConfig<T>(context: ConfigContext<T>) {
  const categories = extractCategories(context.data, context.field);

  const currentLang = context.i18n.currentLang;
  const translate = (value: string) =>
    context.i18n.translate(value, currentLang);

  return categories.map((category) => ({
    name: translate(category) || (category as string),
    value: category,
  }));
}

export function extractCategories<T>(data: T[], field: keyof T) {
  const categorySet = new Set<string>();

  for (const row of data) {
    const val = row[field];

    if (typeof val === 'string' && val !== '') {
      categorySet.add(val);
    }
  }

  return [...categorySet];
}

export function toGroupedColumnSelect<T>(
  cols: ColumnConfig<T>[],
): GroupedColumns<T>[] {
  const groupedColumns = cols.reduce(
    (acc, col) => {
      const group = col.group || 'Other';

      if (!acc[group]) {
        acc[group] = [];
      }

      acc[group].push(col);

      return acc;
    },
    {} as { [key: string]: ColumnConfig<T>[] },
  );

  // Convert the grouped object into an array
  return Object.keys(groupedColumns).map((label) => ({
    label,
    items: groupedColumns[label],
  }));
}
