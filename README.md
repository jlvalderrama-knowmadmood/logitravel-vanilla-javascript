# Lista – Vanilla JS

Aplicación **Vanilla JavaScript** (ES Modules) que gestiona una lista de elementos. Permite **añadir** ítems mediante un **modal**, **seleccionar** varios con click, **eliminar** los seleccionados, **eliminar uno** con doble clic y **deshacer** la última operación gracias a un **histórico (undo)**.

> Proyecto pensado para mostrar organización modular en JS sin frameworks, con estilos CSS separados por bloques, y _bundling_ con Vite.

---

## Funcionalidad

- **Añadir**: botón “Add” abre el modal con foco en el input para mejorar la UX; el botón de enviar se habilita al escribir; al enviar se añade el ítem y se cierra el modal.
- **Listar**: muestra todos los elementos.
- **Seleccionar**: click en un elemento alterna su selección (multi-selección).
- **Eliminar**:
  - **Delete** borra todos los seleccionados.
  - **Doble clic** borra un ítem concreto.
- **Deshacer (Undo)**: revierte al estado anterior usando un historial interno.

---

## Estructura

- **Modularización JS**: separación clara entre **`state`** (datos y operaciones puras), **`ui`** (DOM/render) y **`events`** (listeners).
- **CSS**: dividido por bloques y centralizado en `styles/main.css`, que se importa una sola vez desde `main.js`.

---

## Requisitos

- **Node.js** ≥ 18
- **npm** (o pnpm/yarn si prefieres; los ejemplos usan npm)

---

## Instalación y arranque en desarrollo

```bash
npm install
npm run dev
```

---

## Generar build de producción

```bash
npm run build
```

- Se genera la carpeta dist/ con el bundle optimizado.
- Para previsualizar la build localmente:

```bash
npm run preview
```

## Scripts (`package.json`)

- **dev** – servidor de desarrollo.
- **build** – compila y minifica a dist/.
- **preview** – sirve la build de dist/.

## Notas

- **La app no persiste datos** entre recargas (estado en memoria).
- **El historial de undo crece** con cada operación que modifica la lista (se podría limitar si hiciera falta).
- **Los botones se deshabilitan** cuando la acción no aplica.
