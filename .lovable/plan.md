## Objetivo

Hacer que HALO destaque visualmente sobre el resto de agentes en la sección "Equipo" del home (`src/components/Features.tsx`) aumentando su personaje un 15%, sin romper el layout de la tarjeta.

## Cambio

En la `motion.img` del personaje (línea ~262 de `Features.tsx`):

- Detectar si `f.agent === "HALO"` y aplicar un `scale: 1.15` extra:
  - En el estado base: `scale: isHalo ? 1.15 : 1`
  - En el hover, mantener proporción: `scale: isHalo ? [1.15, 1.24, 1.20] : [1, 1.08, 1.04]`
- Mantener las mismas clases de tamaño (`w-24 ... md:w-44`) para que la tarjeta no cambie de altura — el escalado se hace por transform, así el +15% es puramente visual y se desborda ligeramente sobre el halo/glow, reforzando la sensación de "líder" sin desalinear la grilla.
- `transformOrigin: "center bottom"` para que el aumento empuje hacia arriba y no recorte la cabeza.

## Archivos tocados

- `src/components/Features.tsx` (solo el bloque de la imagen del personaje)

## No se toca

- Tamaño de tarjeta, tipografías, copy, animaciones de las otras 5 cards.
- Sección `/equipo` (HALO ya está en grande allí).
