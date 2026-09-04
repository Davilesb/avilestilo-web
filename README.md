# AVILESTILO — Web v1

Landing premium construida con Next.js 16 + React 19 + Motion. Esta versión es la base visual publicable hoy mismo.

## Requisitos
Node.js 20.9+

## Ejecutar
npm install
npm run dev

Abrir http://localhost:3000

## Publicar hoy en Vercel
1. Crea un repositorio en GitHub llamado `avilestilo-web`.
2. Sube esta carpeta completa.
3. En Vercel: Add New → Project → importa el repositorio.
4. Mantén los valores automáticos de Next.js y pulsa Deploy.

## Próxima capa
- Sanity para administrar productos, colecciones y campañas.
- Mux para los videos IA.
- Shopify Headless para carrito/checkout si se requiere.
- Dominio personalizado.

## Video Hero
La v1 usa un fondo visual animado sin depender de un archivo pesado, para que publique inmediatamente. Cuando exista el primer video Mux, se reemplaza el fondo del Hero por Mux Player.
