# Reordenar página de Precios y arreglar badge

## Cambios en `src/pages/Pricing.tsx`

**1. Nuevo orden de la sección:**
   1. Eyebrow "PLANES Y PRECIOS" (se queda arriba como entrada)
   2. Calculadora ROI ("¿Cuánto te cuesta gestionar el teléfono?") — sube justo debajo del eyebrow
   3. Título "Elige tu plan perfecto" + subtítulo "Sin permanencia..."
   4. Toggle Mensual / Anual
   5. Cards de planes (Starter / Pro / Enterprise)

   Esto agrupa visualmente el título con su toggle y sus cards (que es lo que describe), y mete la calculadora arriba pegada al header de sección.

**2. Arreglar el recorte del badge "Más popular":**

   El badge usa `absolute -top-3` dentro de la card, pero la card Pro tiene `md:-mt-4` (sube la card) y la grilla padre tiene `items-start`, por lo que el badge queda cortado por el borde superior del contenedor de la grilla / por overflow del scroll-margin.

   Soluciones a aplicar:
   - Añadir `pt-4` (o `pt-6`) al contenedor de la grilla de cards para reservar espacio para el badge que sobresale.
   - Subir el badge un poco más (`-top-4`) y asegurar `z-20` para que quede por encima.
   - Quitar `whitespace-nowrap` no es necesario; el problema es de espacio vertical, no horizontal.

**3. Mantener intacto:**
   - Lógica de precios anuales (-20%)
   - FAQ al final
   - Animaciones existentes
   - Hash scroll a `#calculadora` (el `id="calculadora"` debe seguir en el wrapper de `ROICalculator`, ahora arriba)

## Notas técnicas
- No tocar `ROICalculator.tsx` ni el resto de componentes.
- Sin cambios de lógica de negocio, sólo orden de JSX y padding/posicionamiento del badge.
