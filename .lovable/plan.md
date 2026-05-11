## Editar el personaje BYTE de la sección "Analizamos cada conversación"

### Cambios en la imagen
Editar `src/assets/characters/byte-magnifying.webp` (o crear un nuevo asset `byte-analyzing.png`) con `imagegen--edit_image`:

- **Quitar**: el pequeño mecanismo / engranajes que tiene a los pies (no encaja con la idea de análisis de llamadas).
- **Añadir**: una pantalla digital holográfica flotando frente a él, con líneas de onda de audio (waveform) en azul/cian brillante, estilo HUD/holograma futurista. La pantalla puede mostrar también pequeños indicadores tipo dashboard (números, una línea de gráfica).
- **Mantener**: la pose actual (BYTE con la lupa y gafas), la iluminación cinematográfica, el color naranja/ámbar del personaje.
- **Fondo transparente** (PNG) para que se integre igual que el resto.

### Prompt propuesto para edit_image
> "Keep the same orange round 3D character with glasses and magnifying glass, same pose, same lighting. Remove the small mechanical gears/device at his feet — clean ground, nothing there. Add a futuristic floating holographic digital screen in front of him showing glowing cyan/blue audio waveform lines and small dashboard data. The hologram should be semi-transparent with a soft cyan glow. Transparent background, no scenery, clean cutout."

### Integración en código
- Reemplazar el import existente en `src/pages/Index.tsx`:
  - `byte-magnifying-cut.png` → `byte-analyzing-cut.png` (o sobreescribir el mismo archivo).
- Si la imagen generada trae fondo, pasarla por `rembg` (ya instalado) para garantizar transparencia limpia.
- Sin cambios de layout, tamaño ni animaciones — solo se sustituye el asset.

### Archivos tocados
- `src/assets/characters/byte-analyzing.png` (nuevo) y `byte-analyzing-cut.png` (cutout).
- `src/pages/Index.tsx` — una línea de import.