"use client";
import { motion } from "motion/react";
import { useRef } from "react";

export default function Hero(){
  const ref=useRef<HTMLAnchorElement>(null);
  const move=(e:React.PointerEvent<HTMLAnchorElement>)=>{const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();const x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.16}px,${y*.16}px) scale(1.03)`};
  const leave=()=>{if(ref.current)ref.current.style.transform="translate(0,0) scale(1)"};
  return <section className="noise relative min-h-[92svh] overflow-hidden bg-[#070707]">
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(183,255,0,.15),transparent_28%),radial-gradient(circle_at_30%_75%,rgba(77,124,254,.14),transparent_30%),#070707]"/>
      <div className="absolute -left-24 top-24 h-[46vw] w-[46vw] rounded-full bg-[#B7FF00]/10 blur-[120px] animate-pulse"/>
      <div className="absolute -right-24 bottom-0 h-[48vw] w-[48vw] rounded-full bg-[#FF3CAC]/10 blur-[140px]"/>
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#070707] via-[#070707]/70 to-transparent"/>
      <div className="absolute inset-0 opacity-[.18]" style={{backgroundImage:"linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)",backgroundSize:"56px 56px"}}/>
    </div>
    <header className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6 md:px-10">
      <div className="text-sm font-extrabold tracking-[.28em]">AVILESTILO<span className="text-[#B7FF00]">.</span></div>
      <nav className="hidden gap-8 text-xs font-semibold tracking-[.18em] text-white/65 md:flex"><a href="#collection">COLECCIÓN</a><a href="#ai">AI STUDIO</a><a href="#contact">CONTACTO</a></nav>
    </header>
    <div className="mx-auto flex min-h-[78svh] max-w-[1500px] items-end px-6 pb-14 md:px-10 md:pb-20">
      <div className="max-w-6xl">
        <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="mb-5 text-xs font-bold uppercase tracking-[.32em] text-[#B7FF00]">AVILESTILO // 2026</motion.div>
        <h1 className="headline text-[clamp(4rem,10vw,10rem)] font-bold leading-[.84]">{["FUTURE","IS","WEARABLE."] .map((w,i)=><motion.span key={w} initial={{opacity:0,y:45,filter:"blur(12px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} transition={{duration:.9,delay:.18+i*.1,ease:[.16,1,.3,1]}} className="mr-[.18em] inline-block">{w}</motion.span>)}</h1>
        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.62,duration:.75}} className="mt-7 max-w-xl text-base leading-relaxed text-white/62 md:text-lg">Moda urbana reinterpretada mediante diseño, tecnología e inteligencia artificial.</motion.p>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.74,duration:.75}} className="mt-8">
          <a ref={ref} onPointerMove={move} onPointerLeave={leave} href="#collection" className="group relative inline-flex rounded-full p-[1px] transition-transform duration-300 ease-out">
            <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#B7FF00,#4D7CFE,#FF3CAC,#B7FF00)] animate-[spin_4s_linear_infinite]"/>
            <span className="relative flex items-center gap-4 rounded-full bg-[#090909] px-7 py-4 text-sm font-extrabold tracking-[.13em] transition group-hover:bg-white group-hover:text-black">DESCUBRIR COLECCIÓN <span className="transition-transform group-hover:translate-x-1">→</span></span>
          </a>
        </motion.div>
      </div>
    </div>
  </section>
}
