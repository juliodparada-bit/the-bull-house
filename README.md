# The Bull House — Barbershop Website

Sitio web para **The Bull House Barbershop** (Bogotá), desarrollado a partir de un diseño entregado en Canva.

Proyecto de portafolio: implementación front-end + flujo de reservas con agenda y notificación por WhatsApp.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4**
- **Framer Motion**
- Agenda local (JSON) + deep link a WhatsApp

## Funcionalidades

- Home tipo portal (bandas de marca / servicios / reservas / tienda)
- Catálogo de servicios con categorías, precios y detalle
- Wizard de reservas multipaso:
  - varios servicios
  - profesional
  - fecha (meses futuros) + hora
  - datos del cliente
- Bloqueo de agenda + mensaje de confirmación por WhatsApp
- Tienda catálogo con pedido por WhatsApp (contraentrega)
- Contacto, ubicación, reseñas y redes sociales

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Home / navegación principal |
| `/servicios` | Categorías y listado |
| `/servicios/[slug]` | Detalle de servicio |
| `/reservas` | Flujo de reserva |
| `/tienda` | Catálogo de productos |
| `/contacto` `/ubicacion` `/resenas` `/nosotros` | Info del negocio |

## Arranque local

```bash
cp .env.example .env.local
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=57XXXXXXXXXX
NEXT_PUBLIC_INSTAGRAM_URL=...
NEXT_PUBLIC_FACEBOOK_URL=...
NEXT_PUBLIC_TIKTOK_URL=...
```

## Notas

- Profesionales, productos y algunos datos de contacto son de ejemplo / placeholders hasta que el negocio suministre los reales.
- Las reservas se guardan en `data/bookings.json` en entorno local.
- Video hero opcional: colocar `public/hero.mp4`.

## Autor

Proyecto desarrollado como caso de estudio / trabajo para cliente (barbería en Bogotá).
