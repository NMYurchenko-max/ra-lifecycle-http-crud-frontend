import type { ReactNode } from 'react';

/**
 * @template T
 * @component
 * @description Универсальный компонент для отображения списка элементов с помощью render-функции.
 * @param {T[]} items - Массив элементов
 * @param {(item: T, idx: number) => ReactNode} renderItem - Функция для рендеринга одного элемента
 */
export interface WidgetListProps<T> {
  items: T[];
  renderItem: (item: T, idx: number) => ReactNode;
}

export function WidgetList<T>({ items, renderItem }: WidgetListProps<T>) {
  return <div>{items.map(renderItem)}</div>;
}
