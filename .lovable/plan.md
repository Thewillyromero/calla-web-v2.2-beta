## Objetivo

Integrar mejor el personaje LUMI en la cabecera de `/lumi`: quitar el fondo negro recortado y refinar el calendario para que "JUNIO" y "16" sean más sutiles y discretos.

## Cambios

### 1. Recortar fondo negro del personaje
- Generar una versión sin fondo de `src/assets/characters/agent-scheduler.webp` aplicando `rembg` (mismo flujo ya usado en `byte-analyzing-cut.png` y `lumi-writing-cut.png`).
- Guardar como `src/assets/characters/agent-scheduler-cut.png` (transparente).

### 2. Refinar el calendario
Antes de recortar el fondo, editar el asset con `imagegen--edit_image` para:
- Reducir el tamaño del texto "JUNIO" y usar una tipografía más fina/sutil (peso ligero, menor contraste).
- Reducir el tamaño del número "16" para que el círculo rojo discreto siga siendo una señal sutil, no protagonista.
- Mantener todo lo demás idéntico (personaje, pose, iluminación, calendario en sí).

### 3. Actualizar el import
En `src/data/agents.ts`:
- Cambiar `import agentScheduler from "@/assets/characters/agent-scheduler.webp"` por la nueva versión `agent-scheduler-cut.png`.
- El personaje pasará a flotar limpio sobre el fondo de la página (con su drop-shadow ya existente) sin la caja negra.

## Detalles técnicos

- Orden de operaciones: primero refinar el calendario (edit_image), luego pasar `rembg` sobre el resultado para obtener PNG transparente.
- No se toca el layout ni el componente `AgentPage.tsx`; el `<img>` ya hace `object-contain` y respeta transparencia.
