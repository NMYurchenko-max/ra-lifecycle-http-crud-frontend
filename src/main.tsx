import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './App.css'

/**
 * Точка входа в приложение React
 * 
 * @description
 * Этот файл является точкой входа в приложение React.
 * Он создает корневой элемент и рендерит главный компонент App.
 * 
 * @method createRoot - Создает корневой элемент React для рендеринга
 * @method render - Рендерит компонент App в корневой элемент
 */
createRoot(document.getElementById('root')!).render(
    <App />
)
