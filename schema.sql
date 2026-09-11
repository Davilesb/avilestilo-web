-- AVILESTILO® — panel de administración
-- Ejecuta TODO este archivo en Supabase > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Tu usuario administrador actual.
insert into public.admin_users (user_id)
select id from auth.users where email = 'avilestilo2513@gmail.com'
on conflict (user_id) do nothing;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  description text not null default '',
  sizes text[] not null default '{}',
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  tone_name text not null,
  image_url text,
  price numeric(12,2),
  stock integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists product_variants_product_id_idx on public.product_variants(product_id);
create index if not exists products_active_idx on public.products(active);

alter table public.admin_users enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;

-- Helper: solo el usuario de admin_users es administrador.
create or replace function public.is_avilestilo_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

-- Limpiar políticas de esta instalación si se vuelve a ejecutar el script.
drop policy if exists "admins can read admin_users" on public.admin_users;
drop policy if exists "public can read active products" on public.products;
drop policy if exists "admins can manage products" on public.products;
drop policy if exists "public can read active variants" on public.product_variants;
drop policy if exists "admins can manage variants" on public.product_variants;

create policy "admins can read admin_users"
on public.admin_users for select to authenticated
using (public.is_avilestilo_admin());

create policy "public can read active products"
on public.products for select to anon, authenticated
using (active = true);

create policy "admins can manage products"
on public.products for all to authenticated
using (public.is_avilestilo_admin())
with check (public.is_avilestilo_admin());

create policy "public can read active variants"
on public.product_variants for select to anon, authenticated
using (active = true and exists (select 1 from public.products p where p.id = product_id and p.active = true));

create policy "admins can manage variants"
on public.product_variants for all to authenticated
using (public.is_avilestilo_admin())
with check (public.is_avilestilo_admin());

-- Vistas públicas de videos: conserva la tabla que ya creaste.
alter table public.videos enable row level security;
drop policy if exists "Videos publicados visibles para todos" on public.videos;
create policy "Videos publicados visibles para todos"
on public.videos for select to anon, authenticated
using (published = true);

-- Bucket de imágenes de productos. El bucket debe ser público para que las fotos se vean en la web.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

-- Bucket de videos existente: asegúralo como público.
update storage.buckets set public = true where id = 'videos';

-- Políticas de Storage.
drop policy if exists "Admin sube fotos de productos" on storage.objects;
drop policy if exists "Admin actualiza fotos de productos" on storage.objects;
drop policy if exists "Admin elimina fotos de productos" on storage.objects;
drop policy if exists "Todos ven fotos de productos" on storage.objects;
drop policy if exists "Admin sube videos AVILESTILO" on storage.objects;
drop policy if exists "Admin actualiza videos AVILESTILO" on storage.objects;
drop policy if exists "Admin elimina videos AVILESTILO" on storage.objects;
drop policy if exists "Todos ven videos AVILESTILO" on storage.objects;

create policy "Admin sube fotos de productos"
on storage.objects for insert to authenticated
with check (bucket_id = 'product-images' and public.is_avilestilo_admin());

create policy "Admin actualiza fotos de productos"
on storage.objects for update to authenticated
using (bucket_id = 'product-images' and public.is_avilestilo_admin())
with check (bucket_id = 'product-images' and public.is_avilestilo_admin());

create policy "Admin elimina fotos de productos"
on storage.objects for delete to authenticated
using (bucket_id = 'product-images' and public.is_avilestilo_admin());

create policy "Todos ven fotos de productos"
on storage.objects for select to anon, authenticated
using (bucket_id = 'product-images');

create policy "Admin sube videos AVILESTILO"
on storage.objects for insert to authenticated
with check (bucket_id = 'videos' and public.is_avilestilo_admin());

create policy "Admin actualiza videos AVILESTILO"
on storage.objects for update to authenticated
using (bucket_id = 'videos' and public.is_avilestilo_admin())
with check (bucket_id = 'videos' and public.is_avilestilo_admin());

create policy "Admin elimina videos AVILESTILO"
on storage.objects for delete to authenticated
using (bucket_id = 'videos' and public.is_avilestilo_admin());

create policy "Todos ven videos AVILESTILO"
on storage.objects for select to anon, authenticated
using (bucket_id = 'videos');

-- Datos iniciales de las 6 colecciones actuales.
insert into public.products (category, name, description, sizes, sort_order)
select * from (values
 ('jean','Jean Urbano Kids — Tela Cross','Diseño clásico y urbano. Tela Cross (98% algodón + 2% elastano).',ARRAY['2','4','6','8','10','12','14','16'],1),
 ('jogger','Pantalón Jogger Clásico','Jogger infantil de estilo urbano.',ARRAY['2','4','6','8','10','12','14','16'],2),
 ('baggi','Ancho Baggi','Silueta baggi de inspiración urbana.',ARRAY['8','10','12','14','16','18'],3),
 ('bermuda','Bermuda Oversize','Bermuda oversize de niño en tela rígida.',ARRAY['8','10','12','14','16','18'],4),
 ('baggi','Baggi Clásico','Jean baggi de corte urbano.',ARRAY['6','8','10','12','14','16','18'],5),
 ('baggi','Baggi con Flecos','Referencia con detalle distintivo de flecos/desflecado.',ARRAY['12','14','16','18'],6)
) as v(category,name,description,sizes,sort_order)
where not exists (select 1 from public.products p where p.name = v.name);

-- Actualiza updated_at automáticamente.
create or replace function public.touch_avilestilo_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists products_touch_updated_at on public.products;
create trigger products_touch_updated_at before update on public.products for each row execute function public.touch_avilestilo_updated_at();

drop trigger if exists variants_touch_updated_at on public.product_variants;
create trigger variants_touch_updated_at before update on public.product_variants for each row execute function public.touch_avilestilo_updated_at();
