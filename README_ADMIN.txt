AVILESTILO® — ACTUALIZACIÓN CON PANEL ADMINISTRADOR

1) Supabase
- Abre tu proyecto > SQL Editor.
- Copia TODO el contenido de schema.sql.
- Pulsa Run.
- Debe terminar en Success.

2) Archivos para Vercel
Sube/reemplaza en el proyecto estos archivos:
- index.html
- script.js
- styles.css
- admin.html
- admin.js
- schema.sql (puede quedarse en el proyecto, aunque no es necesario para la web)
- carpeta assets/ (conserva las imágenes actuales)

3) Panel de administración
Después de publicar, entra a:
https://TU-DOMINIO.vercel.app/admin.html
Inicia sesión con el usuario administrador de Supabase.

4) Productos
En Admin > Productos puedes:
- crear referencias
- cambiar nombre/descripción/categoría
- cambiar tallas
- activar/ocultar productos
- agregar tonos
- subir fotos por tono
- colocar precio y stock
- editar o eliminar productos

5) Videos
En Admin > Videos puedes:
- subir MP4/WebM
- colocar título
- publicar/ocultar
- eliminar
Los videos publicados aparecen automáticamente en la sección Videos de la tienda.

SEGURIDAD
- El sitio usa la Publishable Key de Supabase, que está diseñada para uso público del navegador.
- NUNCA pongas una Secret Key en index.html, script.js o admin.js.
- El acceso administrativo se controla con Supabase Auth + public.admin_users + RLS.
