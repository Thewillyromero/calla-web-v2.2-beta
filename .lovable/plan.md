## Objetivo

Cerrar la sección con un 6º personaje propio: **HALO**, "la que mantiene a todo el equipo en sincronía". Misma estética de tarjeta que las demás (no banner aparte). El robot del Hero se reutiliza como representación visual de HALO. Y se arregla el fondo blanco de CARE.

## Posicionamiento de HALO

Sexto personaje del equipo, NO un jefe. Su rol: orquestación invisible que conecta a los otros 5. Mantenemos misterio sobre el "cómo" interno (es nuestra salsa secreta) pero mostramos los **resultados visibles** que aporta.

- **agent**: `HALO`
- **personality**: "La que conecta el equipo"
- **title**: "Mantiene todo en sincronía"
- **description**: "El hilo invisible que pasa contexto entre agentes. Cuando ARIA recibe una llamada, LUMI ya conoce al cliente; cuando NOVA cierra una venta, CARE inicia el seguimiento. Sin huecos, sin repeticiones."
- **hsl** sugerido: `220 90% 65%` (azul primary — cohesiona con la marca y se diferencia visualmente del resto que son colores cálidos/fríos diversos).
- **gradient**: `linear-gradient(135deg, hsl(190 100% 70%), hsl(220 100% 70%), hsl(280 100% 75%))` — un degradado que evoca a todos los demás.
- **icon**: `Sparkles` (o `Zap`) de lucide.
- **expandedDetails** (sin revelar el cómo, mostrando el qué):
  1. "Pasa el contexto del cliente entre agentes en tiempo real"
  2. "Decide qué agente entra en cada momento sin que nadie tropiece"
  3. "Detecta si hay que escalar a un humano y lo hace al instante"
  4. "Es nuestra salsa secreta — por eso CALLA funciona como un solo cerebro"

## Cambios en `src/components/Features.tsx`

### 1. Añadir HALO como 6ª entrada del array `features`
- `image`: usar `heroRobot` (`@/assets/hero-robot.webp`) — el ya importado.
- Resto según especificación arriba.

### 2. Quitar el banner "Director de orquesta"
Eliminar el bloque `motion.div` "El director de orquesta" añadido en la iteración anterior. HALO ya cierra la sección como 6ª tarjeta dentro de la misma grilla.

### 3. Limpiar el ajuste `isLastOdd`
Con 6 tarjetas la grilla 2 columnas queda perfecta. Quitar la lógica `isLastOdd` y la clase `md:col-span-2 md:max-w-[calc(50%-10px)]` para que CARE recupere ancho de columna normal y no haya gap.

### 4. Imports — limpiar
Quitar `Wand2`, `Link` (ya no hay banner). `heroRobot` se mantiene porque ahora es la imagen de HALO. Añadir `Sparkles` ya está; añadir `Zap` si lo elegimos como icono (el plan usa `Sparkles`, ya importado).

## Arreglar fondo blanco de CARE

El asset `care-waving.webp` actual tiene un fondo blanco visible. Ejecuto `imagegen--edit_image` sobre `src/assets/characters/care-waving.webp` con prompt para eliminar el fondo y entregar PNG transparente. Lo guardo como `src/assets/characters/care-waving-transparent.png` y actualizo el import en `Features.tsx`.

Prompt: "Remove the white/light background completely, output the character on a fully transparent background. Keep the character's pose, colors and details intact." Aspect ratio 1:1.

## Archivos tocados

- `src/components/Features.tsx` (añadir HALO, quitar banner, limpiar `isLastOdd`, actualizar import de CARE)
- `src/assets/characters/care-waving-transparent.png` (nuevo, generado)

## No se toca

- `index.css`, `tailwind.config.ts`, Hero, otras secciones.
- Animaciones/comportamiento de las 5 tarjetas existentes.
