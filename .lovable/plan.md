## Objetivo

Cerrar la sección "Empleados IA 24/7" con CARE como 5º agente y, debajo de todos, una tarjeta-banner protagonizada por el robot original del Hero presentado como **director de orquesta** que coordina a ARIA, NOVA, LUMI, BYTE y CARE. Así el lector entiende cómo se conectan todos los puntos justo después de leerlos.

## Cambios en `src/components/Features.tsx`

### 1. Añadir CARE al array `features`
Quinta entrada con la misma estructura visual que las demás:
- `image`: `care-waving.webp` (importado desde `@/assets/characters/care-waving.webp`)
- `agent`: `"CARE"`
- `icon`: `HeartHandshake` (lucide)
- `title`: "Cuida la relación post-venta"
- `personality`: "La que fideliza"
- `hsl`: `340 55% 60%` (rosa, coherente con SquadWorkflow)
- `gradient`: `linear-gradient(135deg, hsl(340 100% 65%), hsl(355 100% 65%), hsl(20 100% 65%))`
- `description`: "Hace seguimiento, mide satisfacción y detecta clientes en riesgo antes de que se vayan."
- `expandedDetails`: 4 bullets (seguimiento post-venta, encuestas NPS automáticas, detección de churn, recordatorios de renovación)

### 2. Ajustar la grilla para 5 tarjetas
La grilla actual es `grid md:grid-cols-2 gap-4 md:gap-5`. Con 5 elementos quedaría una tarjeta huérfana. Solución:
- Mantener `md:grid-cols-2`.
- A la 5ª tarjeta (CARE) aplicarle `md:col-span-2` y un wrapper interno `max-w-[calc(50%-10px)] mx-auto` para que ocupe el ancho de una sola columna pero quede **centrada** en la fila inferior.
- En mobile sigue apilando normal.

### 3. Nueva tarjeta "Director de orquesta" debajo de la grilla
Fuera del `motion.div` de la grilla, dentro del mismo `container`, añadir un bloque ancho:

```text
┌──────────────────────────────────────────────────────────┐
│  [robot Hero grande]   EL DIRECTOR                       │
│   batuta / glow         Coordina a todo el equipo        │
│                         Texto explicando cómo ARIA →     │
│                         LUMI/NOVA → BYTE → CARE trabajan │
│                         en sincronía, sin que tú muevas  │
│                         un dedo.                         │
│                         [chips: ARIA · NOVA · LUMI ·     │
│                          BYTE · CARE]                    │
└──────────────────────────────────────────────────────────┘
```

Detalles de implementación:
- Importar `heroRobot from "@/assets/hero-robot.webp"`.
- `motion.div` con `whileInView`, mismas curvas de easing del resto (`[0.22, 1, 0.36, 1]`).
- Margen superior `mt-6 md:mt-8` para integrarse con la grilla.
- Fondo: gradiente sutil multicolor que mezcle los 5 hsl de los agentes a baja opacidad (≈0.06) sobre `hsl(var(--card)/0.5)` — refuerza visualmente "los une a todos".
- Borde `border-primary/25`, glow azul suave (color primary) más una capa multicolor muy tenue.
- Layout: flex `md:flex-row flex-col` con imagen a la izquierda (`w-40 md:w-56`) y contenido a la derecha.
- Animación de la imagen: `animate-float-gentle` + drop-shadow azul para que parezca "iluminado dirigiendo".
- 3-4 partículas/orbes decorativos pequeños alrededor del robot, cada uno con el `hsl` de un agente, animados con `motion` (loop suave).
- Headline (h3) con el mismo tratamiento gradient + relieve que las otras cards, usando un gradiente azul→lavanda→teal que evoque los 5 colores. Texto: **"El director de orquesta"**.
- Subtítulo/eyebrow encima: chip pequeño con icono `Sparkles` y texto "Coordinación total".
- Párrafo: "Mientras cada agente hace su trabajo, el sistema central los mantiene sincronizados. ARIA pasa la llamada a LUMI o NOVA, BYTE lo analiza y CARE cuida el seguimiento. Tú solo ves los resultados."
- Fila de chips clicables (los 5 agentes) reusando los `hsl` y `icon` de cada feature; al hacer click hace scroll a `#demo` (igual que las cards) o nada — estáticos visuales.
- CTA opcional al final: link "Ver cómo trabajan juntos →" hacia `/equipo` (página `SquadWorkflow` ya existente). Recomendado incluirlo porque conecta con la página de flujo.

### 4. Quitar el `CharacterReveal` de fondo (NOVA)
El robot del Hero como director sustituye conceptualmente al NOVA fantasma del fondo. Eliminar el bloque `absolute -right-10 top-1/2` con `CharacterReveal` para no competir visualmente con el nuevo director.

## Archivos tocados

- `src/components/Features.tsx` (único archivo)

## No se toca

- Tipografía, colores globales, `index.css`, ni el Hero original.
- El resto de secciones de la home.
- Lógica/animaciones existentes de las 4 tarjetas actuales.
