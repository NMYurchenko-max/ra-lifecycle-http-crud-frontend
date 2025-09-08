/**
 * HTTP-клиент с использованием fetch и дженериков TypeScript.
 * Универсальная функция request<T> и шорткаты http.get/post/delete.
 * В production префиксует путь базовым URL из VITE_API_BASE_URL; 
 * в dev оставляет относительный путь (работает через Vite proxy).
 */

// База API берётся из .env.production при прод-сборке (GitHub Pages + Render)
const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? '').trim().replace(/\/+$/, '')

/**
 * Склеивает путь с базой. Если база пустая (dev) — возвращает относительный путь.
 */
function toUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return API_BASE ? `${API_BASE}${p}` : p
}

/**
 * Универсальная функция запроса с дженериком результата T.
 * Собираем заголовки: по умолчанию JSON, поверх — пользовательские
 */
export async function request<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  // Собираем заголовки
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  // Выполняем запрос
  const res = await fetch(toUrl(path), {
    ...options,
    headers,
  })

  // Проверяем успешность ответа
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status}: ${text}`)
  }

  // 204 No Content — нет тела
  if (res.status === 204) return null as T

  // Пытаемся определить, что пришёл JSON
  const contentType = res.headers.get('Content-Type') || ''
  if (contentType.includes('application/json')) {
    return (await res.json()) as T
  }

  // Иначе читаем как текст
  const text = await res.text()
  return text as unknown as T
}

/**
 * Удобные шорткаты-методы поверх request<T>.
 * ВАЖНО: пробрасываем дженерик <T> в request<T>(...),
 * иначе TS посчитает T неиспользуемым.
 */
export const http = {
  // GET
  get: <T = unknown>(path: string, init?: RequestInit) =>
    request<T>(path, init),

  // POST (с сериализацией тела в JSON)
  post: <T = unknown>(path: string, body?: unknown, init: RequestInit = {}) =>
    request<T>(path, {
      method: 'POST',
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
      ...init,
    }),

  // DELETE
  delete: <T = unknown>(path: string, init?: RequestInit) =>
    request<T>(path, {
      method: 'DELETE',
      ...(init || {}),
    }),
}

// Экспорт по умолчанию — объект с методами http
export default http
