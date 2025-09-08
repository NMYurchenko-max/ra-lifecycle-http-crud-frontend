import { Widget, WidgetList } from '../shared/ui/widgets'
import NoteCard from './NoteCard' 
import type { Note } from '../../api/notes' 

/**
 * Список заметок, отрисованный через универсальный WidgetList.
 * Пустое состояние обрабатывается отдельно.
 * @module NotesList - компонент списка заметок
 * @module NoteCard - компонент карточки заметки
 * @module Widget - компонент-обёртка
 * @param notes - список заметок, полученный из API  {Note[]} 
 * @param onDelete - обработчик удаления заметки, {(id: number) => void}
 */

// Пропсы компонента
interface Props {
  notes: Note[] 
  onDelete: (id: number) => void 
}

/**
 * Компонент списка заметок.
 * Если список пуст — показываем сообщение о пустом состоянии.
 * render-функцию получаем из импорта бёртки WidgetList
 * 
 */
export default function NotesList({ notes, onDelete }: Props) {
  if (!notes?.length) {
    return <div className="empty">Список пуст</div>
  }

  return (
    // Оборачиваем список виджетом с заголовком
    <Widget title="Список заметок">
      {/* Рендерим список через универсальный WidgetList с render-функцией */}
      <div className="notes-grid">
        <WidgetList
          items={notes}
          renderItem={(note) => (
            // Каждый элемент списка — карточка заметки
            <NoteCard key={note.id} note={note} onDelete={onDelete} />
          )}
        />
      </div>
    </Widget>
  )
}
