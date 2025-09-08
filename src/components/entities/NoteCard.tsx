import type { Note } from '../../api/notes'
// Тип заметки из API-слоя

/**
 * Карточка заметки с кнопкой удаления.
 * Пропсы компонента содержат объект заметки и обработчик удаления по идентификатору.
 */


interface Props {
  note: Note
  onDelete: (id: number) => void
}

/**
 * Компонент карточки заметки.
 */
export default function NoteCard({ note, onDelete }: Props) {
  return (
    // Обёртка карточки заметки
    <div className="note-card">
      {/* Кнопка удаления — вызывает onDelete с id заметки */}
      <button
        className="note-card__delete"
        onClick={() => onDelete(note.id)}
        title="Удалить"
      >
        ×
      </button>
      {/* Контент заметки */}
      <div className="note-card__content">{note.content}</div>
    </div>
  )
}
