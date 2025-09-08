/**
 * API-слой для работы с заметками.
 * Содержит функции getNotes/createNote/deleteNote c рантайм-валидацией данных.
 * Если вдруг понадобится добавить еще какие-то функции, то можно просто добавить их сюда.
 * Type guards для проверки данных - утилита стандартизации при использовании genthic
 * */

import http from './client' // HTTP-клиент
import { isNote, isNotesArray } from '../components/shared/utils/typeGuards'

/**
 * Тип заметки на уровне приложения.
 * Пока сохраняем контракт id: number для совместимости с backend.
 */
export type Note = {
  id: number
  content: string
}

/**
 * Получить все заметки.
 * Выполняет валидацию структуры ответа, чтобы приложение не падало на некорректных данных.
 * @returns Обещание массива корректно типизированных заметок
 * @throws {Error} Если данные невалидны — бросаем читаемую ошибку
 * @return Возвращаем корректно типизированный результат
 */
export async function getNotes(): Promise<Note[]> {
  // Делаем GET-запрос к /notes
  const data = await http.get<unknown>('/notes')
  if (!isNotesArray(data)) {
    throw new Error('Invalid response format: expected Note[]')
  }
  return data
}

/**
 * Создать заметку.
 * Принимает объект с id и content (пока id: number для совместимости), 
 * возвращает unknown согласно контракту.
 * @param id - Идентификатор заметки (по умолчанию 0)
 * @param content - Текстовое содержимое заметки
 * @returns Обещание неопределённого типа согласно API-контракту
 */
export async function createNote({ id = 0, content }: { id?: number; content: string }): Promise<unknown> {
  return http.post<unknown>('/notes', { id, content })
}

/**
 * Удалить заметку по идентификатору.
 * Выполняем DELETE-запрос на /notes/:id
 * @param id - Идентификатор удаляемой заметки
 * @returns Обещание неопределённого типа согласно API-контракту
 */
export async function deleteNote(id: number): Promise<unknown> {
  return http.delete<unknown>(`/notes/${id}`)
}

/**
 * Дополнительная вспомогательная функция:
 * Проверяет, что произвольное значение является валидной заметкой.
 * Может пригодиться в компонентах/сервисах для защиты от некорректных данных.
 * @param value - Проверяемое значение
 * @returns Валидный объект типа Note
 * @throws {Error} Если значение не проходит проверку типов
 */
export function ensureNote(value: unknown): Note {
  if (!isNote(value)) throw new Error('Invalid Note object')
  return value
}
