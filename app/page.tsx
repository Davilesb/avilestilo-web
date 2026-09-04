import Hero from "../components/Hero";

const products=[
 {name:"JEAN URBANO KIDS",price:"$41.000",meta:"Tallas 6 — 18",grad:"from-[#1a1d13] via-[#25271d] to-[#090909]"},
 {name:"URBAN DENIM",price:"$89.000",meta:"Nueva colección",grad:"from-[#151a24] via-[#1b2336] to-[#090909]"},
 {name:"RAW STREET",price:"$95.000",meta:"Edición limitada",grad:"from-[#21151c] via-[#30202b] to-[#090909]"}
];

export default function Home(){return <main>
 <Hero/>
 <section id="collection" className="mx-auto max-w-[1500px] px-6 py-24 md:px-10 md:py-32">
  <div className="flex items-end justify-between gap-8"><div><p className="text-xs font-bold tracking-[.3em] text-[#B7FF00]">DROP 01</p><h2 className="headline mt-3 text-5xl font-bold md:text-7xl">URBAN / FUTURE</h2></div><p className="hidden max-w-md text-right text-sm leading-relaxed text-white/45 md:block">Diseño urbano, siluetas limpias y una capa digital pensada para convertir cada prenda en una experiencia.</p></div>
  <div className="mt-12 grid gap-5 md:grid-cols-3">{products.map((p,i)=><article key={p.name} className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0d0f] transition duration-500 hover:-translate-y-2">
   <div className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${p.grad}`}><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,.14),transparent_30%)]"/><div className="absolute inset-x-8 top-10 h-3 rounded-full bg-white/10 blur-sm"/><div className="absolute inset-0 flex items-center justify-center"><div className="headline text-center text-[15vw] font-bold text-white/5 md:text-[7rem]">{String(i+1).padStart(2,"0")}</div></div><div className="absolute bottom-5 left-5 glass rounded-full px-3 py-1 text-[10px] font-bold tracking-[.2em]">AI VISUAL</div></div>
   <div className="p-6"><div className="flex items-start justify-between gap-4"><h3 className="font-bold tracking-tight">{p.name}</h3><span className="text-sm text-white/65">{p.price}</span></div><p className="mt-2 text-sm text-white/40">{p.meta}</p><button className="mt-5 w-full rounded-full border border-white/10 px-4 py-3 text-xs font-bold tracking-[.18em] transition hover:border-[#B7FF00]/50 hover:bg-[#B7FF00]/10">VER PRODUCTO</button></div>
  </article>)}</div>
 </section>
 <section id="ai" className="mx-auto max-w-[1500px] px-6 pb-24 md:px-10 md:pb-32"><div className="glass overflow-hidden rounded-[36px] p-8 md:p-14"><div className="max-w-3xl"><p className="text-xs font-bold tracking-[.3em] text-[#B7FF00]">AI STUDIO</p><h2 className="headline mt-4 text-5xl font-bold md:text-7xl">TU OUTFIT.<br/>TU UNIVERSO.</h2><p className="mt-6 max-w-xl text-white/55">La siguiente evolución de AVILESTILO será una experiencia donde puedas explorar prendas, crear outfits y descubrir combinaciones generadas con IA.</p><button className="mt-8 rounded-full bg-white px-7 py-4 text-sm font-extrabold tracking-[.13em] text-black">PRÓXIMAMENTE</button></div></div></section>
 <footer id="contact" className="border-t border-white/10 px-6 py-10 md:px-10"><div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-4 text-xs text-white/40 md:flex-row"><span>© 2026 AVILESTILO</span><span>FUTURE IS WEARABLE.</span></div></footer>
 </main>}
