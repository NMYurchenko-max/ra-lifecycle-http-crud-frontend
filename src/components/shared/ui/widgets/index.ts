/**
 * Пакет реэкспортов для компонентов-виджетов.
 * Позволяет импортировать все виджеты и их типы из единой точки.
 */

// Экспорт обёртки-виджета с заголовком
export { Widget } from './widget' // Компонент-обёртка
export type { WidgetProps } from './widget' // Пропсы обёртки

// Экспорт списка с render-функцией
export { WidgetList } from './WidgetList' // Универсальный список
export type { WidgetListProps } from './WidgetList' // Тип пропсов списка

// Экспорт элемента с render-функцией
export { WidgetItem } from './WidgetItem' // Универсальный элемент
export type { WidgetItemProps } from './WidgetItem' // Тип пропсов элемента
