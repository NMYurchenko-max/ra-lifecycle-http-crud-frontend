import React, { useEffect, useState, useCallback } from 'react'
import { getNotes, createNote, deleteNote } from './api/notes'
import NoteForm from './components/entities/NoteForm'
import NotesList from './components/entities/NotesList'
import type { Note } from './api/notes'

/**
 * Главный компонент приложения.
 * Управляет загрузкой/созданием/удалением заметок и состояниями UI.
 * 
 */
/**
 * Основной компонент приложения для управления заметками.
 *
 * Этот компонент обрабатывает полный жизненный цикл заметок, включая:
 * -Загрузка заметок с API на монтировании компонента
 * -Создание новых заметок через форму
 * -Удаление существующих заметок
 * -отображение состояний загрузки и сообщений об ошибках
 *
 * Компонент использует React Hooks для управления государством и побочных эффектов:
 * -USESTATE для управления списком заметок, содержимое формы, состояние загрузки и ошибки
 * -UseCallback для запоминания функции нагрузки
 * Использовать эффект для запуска начальной нагрузки данных
 * -UseEffect для запуска начальной нагрузки данных и обновления списка заметок при изменении данных
 *  setLoading - индикатор загрузки
 *  setError - сообщение об ошибке
 *  setNotes - список заметок, 
 *  setContent - содержимое формы
 */
export default function App() {
  // Состояния приложения
  const [notes, setNotes] = useState<Note[]>([])
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Загрузка заметок из API с обработкой ошибок
  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getNotes()
      setNotes(data)
    } catch (e) {
      console.error(e) 
      setError('Не удалось загрузить заметки')
    } finally {
      setLoading(false)
    }
  }, [])

  // Загружаем заметки при монтировании компонента
  useEffect(() => {
    load()
  }, [load])

  // Обработчик отправки формы (создание заметки)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() 
    if (!content.trim()) return
    try {
      await createNote({ id: 0, content: content.trim() })
      // Создаём заметку (пока id: number)
      setContent('')
      // Обновляем список заметок
      await load()
    } catch (e) {
      console.error(e)
      setError('Не удалось добавить заметку') // Выводим ошибку
    }
  }

  // Обработчик удаления заметки
  const handleDelete = async (id: number) => {
    try {
      // Удаляем заметку по id
      await deleteNote(id) 
      // Обновляем список заметок
      await load()
    } catch (e) {
      console.error(e)
      setError('Не удалось удалить заметку') // Выводим ошибку
    }
  }

  return (
    // Контейнер страницы
    <div className="container">
      {/* Шапка приложения */}
      <header className="header">
        <h1>Notes</h1>
        {/* Кнопка ручной перезагрузки списка */}
        <button className="refresh-btn" onClick={load} type="button" title="Обновить">⟳</button>
      </header>

      {/* Форма добавления заметки */}
      <NoteForm value={content} onChange={setContent} onSubmit={handleSubmit} />

      {/* Сообщение об ошибке */}
      {error && <div className="error">{error}</div>}

      {/* Лоадер либо список заметок */}
      {loading ? (
        <div className="loading">Загрузка...</div>
      ) : (
        <NotesList notes={notes} onDelete={handleDelete} />
      )}
    </div>
  )
}
