import React, { useMemo } from 'react' // Импорт React и useMemo для memoization
import { v4 as uuidv4 } from 'uuid' // Генератор UUID для стабильных id
import { Widget } from '../shared/ui/widgets' // Обёртка-виджет с заголовком

/**
 * Форма добавления новой заметки.
 * Компонент переиспользуемый, оформлен как виджет.
 * @module NoteForm - компонент формы добавления заметок
 * Import widget.tsx - обёртка-виджет с заголовком
 * UseMemo используется для генерации стабильного id для поля ввода
 * uuidv4() - генерирует уникальный id для каждого вызова
 * props.value - текущее значение текстового поля
 * props.onChange - обработчик изменения текста
 * props.onSubmit - обработчик отправки формы
 */

// Пропсы компонента формы
interface Props {
  value: string 
  onChange: (value: string) => void 
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

/**
 * Компонент формы добавления заметок с обёрткой Widget.
 * @module NoteForm - компонент формы добавления заметок
 */
export default function NoteForm({ value, onChange, onSubmit }: Props) {
  // Стабильный id для поля ввода (генерируется один раз на маунте компонента)
  const textareaId = useMemo(() => `note-input-${uuidv4()}`, [])

  return (
    // Оборачиваем форму в Widget с заголовком
    <Widget title="📝">
      {/* Форма отправляет событие вверх через onSubmit */}
      <form className="note-form" onSubmit={onSubmit}>
        {/* Явная подпись + привязка к textarea через htmlFor для доступности */}
        <label className="note-form__label" htmlFor={textareaId}>Новая заметка</label>
        {/* Контейнер с textarea и кнопкой */}
        <div className="note-form__controls">
          {/* Текстовая область для ввода содержимого заметки */}
          <textarea
            id={textareaId} // Привязка id к label
            className="note-form__textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Введите текст..."
            rows={3}
          />
          {/* Кнопка отправки формы */}
          <button type="submit" className="btn">Добавить</button>
        </div>
      </form>
    </Widget>
  )
}
