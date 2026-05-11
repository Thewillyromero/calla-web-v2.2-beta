
# Rediseño de "¿Qué hacemos?" y "¿Por qué CALLA?" + personaje de fondo

## Diagnóstico

Hoy ambas secciones son **3 + 4 cards genéricas** con fondo plano (`bg-card/40`), borde gris e icono lucide pequeño. Cero presencia de marca y, en móvil, 7 cards apiladas = scroll monótono.

## Propuesta visual

### Sección 2 — "¿Qué hacemos por tu empresa?"

3 cards "showcase" con personaje 3D del agente correspondiente (ARIA / LUMI / BYTE):

```text
┌──────────────────────────────┐
│  [ARIA 3D, aura teal suave]  │
│                              │
│  Atendemos TODAS             │
│  tus llamadas                │
│  ─────                       │
│  24/7, festivos y noches.    │
│  → Conoce a ARIA             │
└──────────────────────────────┘
```

- Personaje 3D recortado arriba (~120px desktop, ~80px móvil) sobre blob de color del agente.
- Fondo card: `bg-gradient-to-br` muy sutil con color del agente (`teal/10 → background`).
- Borde `border-primary/20`, hover lift sutil.
- Card vinculada a la subpágina del agente.

### Sección 3 — "¿Por qué CALLA y no otra solución?"

Layout asimétrico tipo "feature spotlight":

```text
┌─────────────┬───────────────────┐
│  No somos   │   [NOVA peeking,  │
│  un chatbot │    aura lavender] │
│  Voz natural│                   │
├─────────────┼─────────┬─────────┤
│ En tu nº    │ 30 min  │ RGPD    │
│ actual      │ activo  │ Europa  │
└─────────────┴─────────┴─────────┘
```

- 1 card grande "diferenciador hero" (No somos un chatbot) con NOVA peeking lateral y degradado lavender.
- 3 cards compactas con icono sobre círculo con gradiente.
- Móvil: card grande mantiene personaje; las 3 pequeñas en fila horizontal con scroll-snap (3 visibles ≈ 1 pantalla) → reduce scroll.

## NUEVO — Personaje de fondo desvanecido + aurora

Añadir **un personaje 3D decorativo** detrás de una de las dos secciones (propongo **Sección 3**, que es más densa y se beneficia más):

- Personaje en pose nueva (ej. CARE o LUMI) anclado en la esquina inferior-derecha.
- Tamaño grande (~480px desktop, oculto o ~240px móvil para no comer GPU).
- `opacity: 0.12-0.18`, `blur-[1px]`, `mix-blend-luminosity` para que se funda con el fondo.
- Detrás: blob de **aurora** con degradado lavender→teal (`blur-[120px]`, `opacity-30`) animado lento (`aurora-pulse 25s`).
- `pointer-events-none`, `z-0`, contenido encima en `z-10`.
- En móvil: aurora sí, personaje oculto (`hidden md:block`) para mantener performance.

```text
              ┌─────────────────────────┐
              │  Sección 3 (cards)      │
              │                         │
              │              [aurora]   │
              │            ╱            │
              │     [3D char fade 15%]  │
              └─────────────────────────┘
```

## Sistema de color (tokens existentes)

| Card | Token aura |
|---|---|
| ARIA | `brand-teal` |
| LUMI | `primary` (azul) |
| BYTE | `brand-lavender` |
| NOVA (sec.3 hero) | `brand-lavender` |
| Diferenciadores | gradientes `from-primary to-brand-teal` |
| Personaje fondo | aurora `lavender → teal` |

Sin nuevos tokens.

## Performance móvil

- Personajes card: `loading="lazy"`, ancho máx 80px móvil.
- Personaje fondo: `hidden md:block` (no se renderiza en móvil).
- Aurora fondo: `blur-[120px]` único, animación 25s (no infinita rápida).
- Sin nuevas animaciones globales.

## Archivos a tocar

- `src/pages/Index.tsx` — JSX de las dos secciones; arrays con `image`/`color`.
- Posible `src/components/ValueCard.tsx` para mantener Index.tsx limpio.
- Sin cambios en `index.css` (reusa `aurora-pulse`).

---

**¿Apruebo? Si quieres, puedo elegir yo el personaje de fondo (sugiero CARE en pose acogedora para reforzar el mensaje de confianza), o dime cuál prefieres.**
