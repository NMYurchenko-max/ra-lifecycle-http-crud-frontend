/**
 * Универсальные и специализированные type guard'ы для приложения.
 * Позволяют выполнять рантайм-валидацию данных из внешних источников.
 * Все функции снабжены подробными комментариями для обучения.
 */

import type { ReactNode } from 'react' // Импортируем тип для ReactNode

/**
 * Проверяет, что значение является непустым объектом (не массив и не null).
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  // Проверяем тип на 'object' и исключаем null
  if (typeof value !== 'object' || value === null) return false
  // Array.isArray вернёт true для массивов — исключа��м массивы
  if (Array.isArray(value)) return false
  // Иначе это объект вида Record<string, unknown>
  return true
}

/**
 * Универсальный валидатор массива с проверкой каждого элемента через переданный guard.
 */
export function isArrayOf<T>(
  value: unknown, // Неизвестное значение для проверки
  itemGuard: (v: unknown) => v is T // Валидатор одного элемента массива
): value is T[] {
  // Проверяем, что значение — массив
  if (!Array.isArray(value)) return false
  // Проверяем каждый элемент массива указанным guard'ом
  return value.every(itemGuard)
}

/**
 * Универсальный guard для generic-пропсов компонентов с item и renderItem.
 * Можно использовать для любых компонент с generic item/renderItem.
 */
export function isGenericProps<T, Base extends object = object>(
  props: Base & Partial<{ item: T; renderItem: (item: T) => ReactNode }>
): props is Base & { item: T; renderItem: (item: T) => ReactNode } {
  // Проверяем наличие свойств и тип renderItem === 'function'
  return (
    'item' in props &&
    'renderItem' in props &&
    typeof (props as { renderItem?: unknown }).renderItem === 'function'
  )
}

// ===== Специализированные guard'ы для заметок =====

/**
 * Валидатор отдельной заметки: { id: number; content: string }
 * Не привязываемся к интерфейсам TS, проверяем только форму данных.
 */
export function isNote(value: unknown): value is { id: number; content: string } {
  // Сначала убеждаемся, что это объект
  if (!isRecord(value)) return false
  // Проверяем id на число (целочисленность не обязательна для валидности TS-типа)
  if (typeof value.id !== 'number') return false
  // Проверяем content на строку
  if (typeof value.content !== 'string') return false
  // Все проверки пройдены — это заметка корректной формы
  return true
}

/**
 * Валидатор массива заметок.
 */
export function isNotesArray(value: unknown): value is { id: number; content: string }[] {
  // Используем универсальный isArrayOf с guard'ом для одной заметки
  return isArrayOf(value, isNote)
}
