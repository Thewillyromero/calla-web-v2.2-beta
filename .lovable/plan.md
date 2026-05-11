## Ajustes a las tarjetas de "¿Qué hacemos por tu empresa?"

Tres cambios puntuales en `src/pages/Index.tsx` (sección 2, alrededor de las líneas 325–371):

### 1. Personajes más grandes
- Desktop: `w-36 h-36` → **`w-48 h-48`** (de 144px a 192px).
- Móvil: `w-32 h-32` → **`w-40 h-40`**.

### 2. Personajes más cerca del texto (cerrar el gap)
- Bajar la posición vertical: `-top-16 sm:-top-20` → **`-top-10 sm:-top-12`**.
- Reducir el padding superior de la card para que el cuerpo "abrace" al personaje: `pt-20 sm:pt-24` → **`pt-24 sm:pt-28`** (compensa el tamaño mayor) y bajar el `pt` del grid contenedor: `pt-20 sm:pt-24` → **`pt-16 sm:pt-20`**.
- Resultado: el personaje queda asomando ~⅓ por encima de la card en lugar de flotar separado.

### 3. Glow más intenso al hover (estilo Features.tsx)
Replicar el patrón de `src/components/Features.tsx` (líneas 194–220):

- **Card** — `boxShadow` al hover: `0 0 50px ${color}40, 0 25px 60px rgba(0,0,0,0.25)` (más amplio y saturado que el actual `${color}33`).
- **Borde** al hover: `${color}99` (en lugar de `${color}66`, más opaco).
- **Aura del personaje** — Subir el blob de color: `opacity-50 group-hover:opacity-90` → **`opacity-40 group-hover:opacity-100`** y agrandar a `w-52 h-52` con `scale-[1.8]` para que el halo lo envuelva entero como en Features.
- **Filter del personaje** al hover: subir intensidad de los `drop-shadow` de `${color}cc` → **`${color}ee`** y duplicar el segundo glow para más "pop": `drop-shadow(0 0 28px ${color}ee) drop-shadow(0 0 12px ${color}aa) drop-shadow(0 8px 16px ${color}66)`.
- **Microanimación**: añadir un sutil `scale: [1, 1.06, 1.03]` con framer-motion en el personaje al hover (idéntico a Features línea 233), opcional pero remata la sensación de "vida".

### Archivos tocados
- `src/pages/Index.tsx` — únicamente el bloque del map sobre `valueProps` (líneas 325–371). Sin cambios en CSS global, sin nuevos imports.

### No se toca
- Sección 3 ("¿Por qué CALLA?") y NOVA — el usuario no las menciona.
- Tamaños/gaps en móvil quedan proporcionales al cambio desktop.