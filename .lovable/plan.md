## Problema
Los títulos de los agentes en `Features.tsx` quedaron oscuros porque uso el mismo HSL del agente con opacidad reducida. El efecto deseado es como `text-gradient text-glow-lavender` de "nunca duerme": colores **brillantes** (lightness alta ~65-75%) y multi-stop, con un glow sutil.

## Solución

### 1. Añadir gradientes brillantes por agente
En `src/components/Features.tsx`, añadir a cada feature un campo `gradient` con 2 paradas brillantes en la familia cromática del personaje:

- **ARIA (teal)**: `linear-gradient(135deg, hsl(190 75% 70%), hsl(200 80% 78%))`
- **NOVA (lavender)**: `linear-gradient(135deg, hsl(260 70% 75%), hsl(285 65% 78%))`
- **LUMI (emerald)**: `linear-gradient(135deg, hsl(160 60% 65%), hsl(145 55% 72%))`
- **BYTE (amber)**: `linear-gradient(135deg, hsl(35 85% 68%), hsl(45 90% 75%))`

### 2. Aplicar gradiente + glow al `<h3>`
Sustituir el style actual:
```
backgroundImage: `linear-gradient(135deg, hsl(${f.hsl}) 0%, hsl(${f.hsl} / 0.65) 100%)`
```
Por:
```
backgroundImage: f.gradient,
filter: `drop-shadow(0 0 24px hsl(${f.hsl} / 0.35))`
```
Manteniendo `bg-clip-text text-transparent` para el efecto de texto degradado luminoso, replicando el patrón de `.text-gradient` + `.text-glow-lavender`.

## Detalles técnicos
- Solo se edita `src/components/Features.tsx`.
- No se tocan animaciones, layout, ni el resto de tipografía.
- Los HSL del badge/icono (`f.hsl`) se mantienen para no romper la coherencia visual del resto de la tarjeta.
