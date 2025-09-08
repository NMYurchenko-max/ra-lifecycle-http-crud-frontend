/**
 * Минимальная декларация типов для пакета "react-node" без использования any.
 * Добавлены перегрузки, отражающие поведение оригинальной функции (selector/component, props?, children?).
 * Построчные комментарии прилагаются для обучения.
 */

declare module 'react-node' {
  // Импортируем типы React для описания сигнатур
  import type { ReactElement, ReactNode, ComponentType } from 'react'

  // Допустимые типы первого аргумента: строковый селектор или React-компонент
  type ComponentInput = string | ComponentType<unknown>

  // Тип пропсов — произвольный объект с неизвестными значениями
  type Props = Record<string, unknown>

  // Дети — массив ReactNode (соответствует реализации модуля)
  type Children = ReactNode[]

  // Перегрузка №1: (component, props, children)
  function reactNode(component: ComponentInput, props: Props, children: Children): ReactElement

  // Перегрузка №2: (component, children) — когда второй аргумент трактуется как дети
  function reactNode(component: ComponentInput, children: Children): ReactElement

  // Базовая сигнатура со всеми параметрами опционально, для совместимости вызовов
  function reactNode(
    component: ComponentInput, // Селектор или компонент
    props?: Props | Children, // Либо объект пропсов, либо массив детей
    children?: Children // Необязательный массив детей
  ): ReactElement

  // Экспорт по умолчанию — сама функция
  export default reactNode
}
