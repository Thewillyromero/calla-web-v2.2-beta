## Objetivo
Mejorar la sección "Tu equipo de IA que nunca duerme" en home (`src/components/Features.tsx`):
1. Bajar y centrar verticalmente los personajes dentro de cada tarjeta.
2. Hacer el texto descriptivo más legible (más claro).
3. Aplicar al título en negrita un degradado con los colores del personaje correspondiente.

## Cambios en `src/components/Features.tsx`

### 1. Reposicionar los personajes
- Cambiar el contenedor del personaje (línea 211): quitar `-mt-12 md:-mt-16` (que hace que sobresalgan por arriba) y alinear con `self-center` para que queden centrados verticalmente respecto al bloque de texto.
- Cambiar el contenedor padre (línea 207) de `items-start` a `items-center` para alinear personaje y texto en el medio.

### 2. Texto descriptivo más legible
- Línea 315: cambiar `text-muted-foreground/80` por `text-foreground/85` (o similar) para mayor contraste y legibilidad.

### 3. Título con degradado del color del personaje
- Línea 311-313: aplicar `background-image: linear-gradient(135deg, hsl({hsl}) 0%, hsl({hsl} / 0.6) 100%)` con `bg-clip-text text-transparent` solo al `<h3>`.
- Cada agente tendrá su propio degradado (teal para ARIA, lavender para NOVA, emerald para LUMI, amber para BYTE) usando el `f.hsl` ya definido en cada feature.
- Mantener `font-display font-bold` y tamaños actuales.

## Detalles técnicos
- No se cambian los assets de personajes ni el layout de la grid.
- No se tocan animaciones (hover, partículas, pop-in).
- Solo edición visual/CSS dentro del componente Features.tsx.
