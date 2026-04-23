'use client'; 

import React, { useState, useEffect, useRef } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion'; 

// --- 1. KOMPONEN BARIS BIASA ---
const CarouselRow = ({ title, id, photos, setActivePhotoVideo }: { title: string, id: string, photos: any[], setActivePhotoVideo: any }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rowRef.current;
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; 
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;
      const isAtRightEnd = Math.ceil(el!.scrollLeft + el!.clientWidth) >= el!.scrollWidth;
      const isAtLeftEnd = el!.scrollLeft <= 0;

      if ((isScrollingDown && isAtRightEnd) || (isScrollingUp && isAtLeftEnd)) return; 
      e.preventDefault(); 
      el!.scrollLeft += e.deltaY * 1.5; 
    };

    if (el) el.addEventListener('wheel', handleWheel, { passive: false });
    return () => { if (el) el.removeEventListener('wheel', handleWheel); };
  }, []);

  return (
    <div className="mb-8 md:mb-12" id={id}>
      <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4 drop-shadow-md px-4 md:px-0">{title}</h2>
      <div ref={rowRef} className="flex space-x-3 md:space-x-4 overflow-x-scroll scrollbar-hide py-2 md:py-4 pl-4 md:pl-0 pr-10">
        {photos.map((item) => (
          <motion.div key={item.id} whileHover={{ scale: 1.05, zIndex: 40 }} transition={{ duration: 0.2 }} onClick={() => setActivePhotoVideo(item.video)} className="relative w-[160px] md:w-[280px] h-[90px] md:h-[160px] flex-none bg-zinc-800 rounded-md cursor-pointer overflow-hidden border border-transparent hover:border-white shadow-lg group">
            <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-black/50 rounded-full flex items-center justify-center border border-white/50 backdrop-blur-sm">
                {/* ICON PLAY SVG PENGGANTI EMOJI */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-6 md:h-6 text-white ml-1"><path d="M8 5v14l11-7z" /></svg>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2 md:p-4">
              <h3 className="text-white font-bold text-xs md:text-base drop-shadow-md">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- 2. KOMPONEN "TOP 10" ---
const Top10Row = ({ photos, setActivePhotoVideo }: { photos: any[], setActivePhotoVideo: any }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rowRef.current;
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; 
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;
      const isAtRightEnd = Math.ceil(el!.scrollLeft + el!.clientWidth) >= el!.scrollWidth;
      const isAtLeftEnd = el!.scrollLeft <= 0;

      if ((isScrollingDown && isAtRightEnd) || (isScrollingUp && isAtLeftEnd)) return; 
      e.preventDefault();
      el!.scrollLeft += e.deltaY * 1.5;
    };
    if (el) el.addEventListener('wheel', handleWheel, { passive: false });
    return () => { if (el) el.removeEventListener('wheel', handleWheel); };
  }, []);

  return (
    <div className="mb-10 md:mb-16 mt-4" id="top-10">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-6 drop-shadow-md px-4 md:px-0">Top 10 Momen Paling Bikin Salting</h2>
      <div ref={rowRef} className="flex space-x-10 md:space-x-16 overflow-x-scroll scrollbar-hide py-4 md:py-6 pl-8 md:pl-10 pr-10">
        {photos.map((item, index) => (
          <div key={item.id} className="relative flex items-center flex-none w-[130px] md:w-[260px] group cursor-pointer" onClick={() => setActivePhotoVideo(item.video)}>
            <span className="absolute -left-6 md:-left-12 text-[80px] md:text-[180px] font-black text-[#141414] tracking-tighter z-0 transition-colors duration-300 group-hover:text-zinc-800" style={{ WebkitTextStroke: '3px #52525B', lineHeight: '1' }}>
              {index + 1}
            </span>
            <motion.div whileHover={{ scale: 1.05, x: 10, zIndex: 40 }} transition={{ duration: 0.2 }} className="relative w-[110px] md:w-[180px] h-[155px] md:h-[260px] ml-6 md:ml-10 bg-zinc-800 rounded-md overflow-hidden shadow-[10px_0_20px_rgba(0,0,0,0.8)] border border-transparent group-hover:border-white z-10">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-black/50 rounded-full flex items-center justify-center border border-white/50 backdrop-blur-sm">
                   {/* ICON PLAY SVG PENGGANTI EMOJI */}
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-6 md:h-6 text-white ml-1"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showTextModal, setShowTextModal] = useState(false);
  const [activePhotoVideo, setActivePhotoVideo] = useState<string | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false); 
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80; 
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const triggerEasterEgg = () => {
    setShowHearts(true);
    setTimeout(() => { setShowHearts(false); }, 4000);
  };

  // --- URL UTAMA ---
  const trailerUrl = "https://qusvxxdfnqlahvxaqylt.supabase.co/storage/v1/object/public/ourflix-media/Trailer.mp4";
  const birthdayVideoUrl = "https://www.youtube.com/embed/-6ls0XmdsL8?autoplay=1&rel=0"; 
  const anggyProfilePhotoUrl = "https://qusvxxdfnqlahvxaqylt.supabase.co/storage/v1/object/public/ourflix-media/profil/Anggy-profile.jpg"; 

  // --- 🚨 DATA FOTO & VIDEO ---
  const baseUrl = "https://qusvxxdfnqlahvxaqylt.supabase.co/storage/v1/object/public/ourflix-media";

  // FIX: Menggunakan "image_" untuk Top 10 sesuai Supabase
  const top10Photos = Array.from({ length: 10 }, (_, i) => ({ 
    id: `top-${i}`, title: `Top ${i + 1}`, 
    img: `${baseUrl}/top-season/image_${i + 1}.webp`, 
    video: `${baseUrl}/Vidio/Top_Vidio/vidio_${i + 1}.MP4` 
  }));  
  
  const season1Photos = Array.from({ length: 10 }, (_, i) => ({ 
    id: `s1-${i}`, title: `Momen ${i + 1}`, 
    img: `${baseUrl}/season-1/foto_${i + 1}.webp`, 
    video: `${baseUrl}/Vidio/season-1/vidio_${i + 1}.MP4` 
  }));
  const season2Photos = Array.from({ length: 10 }, (_, i) => ({ 
    id: `s2-${i}`, title: `Momen ${i + 1}`, 
    img: `${baseUrl}/season-2/foto_${i + 1}.webp`, 
    video: `${baseUrl}/Vidio/season-2/vidio_${i + 1}.MP4` 
  }));
  const season3Photos = Array.from({ length: 10 }, (_, i) => ({ 
    id: `s3-${i}`, title: `Momen ${i + 1}`, 
    img: `${baseUrl}/season-3/foto_${i + 1}.webp`, 
    video: `${baseUrl}/Vidio/season-3/vidio_${i + 1}.MP4` 
  }));
  const season4Photos = Array.from({ length: 10 }, (_, i) => ({ 
    id: `s4-${i}`, title: `Momen ${i + 1}`, 
    img: `${baseUrl}/season-4/foto_${i + 1}.webp`, 
    video: `${baseUrl}/Vidio/season-4/vidio_${i + 1}.MP4` 
  }));
  const season5Photos = Array.from({ length: 10 }, (_, i) => ({ 
    id: `s5-${i}`, title: `Momen ${i + 1}`, 
    img: `${baseUrl}/season-5/foto_${i + 1}.webp`, 
    video: `${baseUrl}/Vidio/season-5/vidio_${i + 1}.MP4` 
  }));

  const heartsArray = Array.from({ length: 25 });

  return (
    <main className="min-h-screen w-full text-white bg-[#141414] overflow-x-hidden relative flex flex-col">
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out px-4 md:px-10 py-3 md:py-4 flex items-center justify-between ${isScrolled ? 'bg-[#141414] shadow-lg' : 'bg-gradient-to-b from-black/90 to-transparent'}`}>
        <div className="flex items-center gap-6 md:gap-8">
          <h1 onClick={scrollToTop} className="text-red-600 font-extrabold text-2xl md:text-3xl tracking-tighter cursor-pointer hover:scale-105 transition">OURFLIX</h1>
          <ul className="hidden lg:flex gap-4 text-xs font-medium text-gray-300">
            <li onClick={scrollToTop} className="text-white font-bold cursor-pointer hover:text-gray-400 transition">Beranda</li>
            <li onClick={() => scrollToSection('top-10')} className="cursor-pointer hover:text-gray-400 transition font-bold text-yellow-500">Top 10</li>
            {[1, 2, 3, 4, 5].map((num) => (
               <li key={num} onClick={() => scrollToSection(`musim-${num}`)} className="cursor-pointer hover:text-gray-400 transition">Musim {num}</li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:block text-sm font-medium drop-shadow-md">Spesial untuk Anggy</span>
          <div onClick={() => setShowProfileModal(true)} className="w-8 h-8 md:w-10 md:h-10 rounded overflow-hidden shadow-md cursor-pointer border border-transparent hover:border-white transition-all hover:scale-105">
            <img src={anggyProfilePhotoUrl} alt="Profil Anggy" className="w-full h-full object-cover" />
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <div className="relative h-[70vh] md:h-[85vh] w-full flex-none">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <video className="w-full h-full object-cover" src={trailerUrl} autoPlay loop muted playsInline />
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 md:bg-black/30"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 md:h-40 bg-gradient-to-t from-[#141414] to-transparent"></div>
        </div>

        <div className="absolute top-[35%] md:top-[40%] left-4 md:left-20 flex flex-col items-start space-y-3 md:space-y-4 max-w-xl z-10 pr-4">
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter drop-shadow-2xl">Adit & Anggy</h1>
          <p className="text-sm md:text-xl font-medium drop-shadow-md text-gray-200 line-clamp-3 md:line-clamp-none">
            Sebuah perjalanan visual merayakan hari spesialmu. Menampilkan momen-momen terbaik yang tertangkap lensa.
          </p>
          <div className="flex flex-row space-x-2 md:space-x-4 pt-2 md:pt-4">
            
            {/* --- FIX TOMBOL PUTAR VIDEO (Pakai SVG) --- */}
            <button onClick={() => setShowVideoModal(true)} className="flex items-center justify-center gap-2 rounded bg-white px-4 md:px-8 py-2 md:py-3 text-sm md:text-lg font-bold text-black transition hover:bg-white/80 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-6 md:h-6"><path d="M8 5v14l11-7z" /></svg>
              Putar Video
            </button>
            
            {/* --- FIX TOMBOL PESAN INFO (Pakai SVG) --- */}
            <button onClick={() => setShowTextModal(true)} className="flex items-center justify-center gap-2 rounded bg-[#515451]/70 px-4 md:px-8 py-2 md:py-3 text-sm md:text-lg font-bold text-white transition hover:bg-[#515451]/50 backdrop-blur-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-6 md:h-6"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              Pesan Spesial
            </button>

          </div>
        </div>
      </div>

      {/* --- ROW CAROUSEL SECTION --- */}
      <div className="relative z-20 md:pl-20 flex flex-col flex-grow pb-10 md:pb-20 overflow-hidden">
        <Top10Row photos={top10Photos} setActivePhotoVideo={setActivePhotoVideo} />
        <CarouselRow id="musim-1" title="Musim 1: Awal Bertemu" photos={season1Photos} setActivePhotoVideo={setActivePhotoVideo} />
        <CarouselRow id="musim-2" title="Musim 2: Solusi Buku" photos={season2Photos} setActivePhotoVideo={setActivePhotoVideo} />
        <CarouselRow id="musim-3" title="Musim 3: Pantai" photos={season3Photos} setActivePhotoVideo={setActivePhotoVideo} />
        <CarouselRow id="musim-4" title="Musim 4: Tangis & Tawa" photos={season4Photos} setActivePhotoVideo={setActivePhotoVideo} />
        <CarouselRow id="musim-5" title="Musim 5: Shira Media" photos={season5Photos} setActivePhotoVideo={setActivePhotoVideo} />
      </div>

      {/* --- FOOTER KHUSUS OURFLIX --- */}
      <footer className="relative w-full bg-[#101010] pt-12 md:pt-16 pb-16 md:pb-12 px-6 md:px-20 border-t border-zinc-800 text-gray-400 text-xs md:text-sm overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col gap-8 md:gap-10 relative z-10">
          <p className="hover:text-white cursor-pointer transition flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            Pusat Bantuan Cinta & Hubungan Asmara Adit
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
            <ul className="space-y-3 md:space-y-4"><li className="hover:text-white hover:underline cursor-pointer transition">Audio Description (Suara Hatiku)</li><li className="hover:text-white hover:underline cursor-pointer transition">Investor Relations (Doa & Restu)</li></ul>
            <ul className="space-y-3 md:space-y-4"><li className="hover:text-white hover:underline cursor-pointer transition">Help Center (Butuh Pelukan)</li><li className="hover:text-white hover:underline cursor-pointer transition">Jobs (Menjadi Teman Hidup)</li></ul>
            <ul className="space-y-3 md:space-y-4"><li className="hover:text-white hover:underline cursor-pointer transition">Gift Cards (Traktir Makan)</li><li className="hover:text-white hover:underline cursor-pointer transition">Terms of Use (Selalu Setia)</li></ul>
            <ul className="space-y-3 md:space-y-4"><li className="hover:text-white hover:underline cursor-pointer transition">Media Center (Galeri Kita)</li><li className="hover:text-white hover:underline cursor-pointer transition">Privacy (Rahasia Berdua)</li></ul>
          </div>
          <div className="mt-4 md:mt-8">
            <button onClick={triggerEasterEgg} className="group relative border border-gray-600 px-4 py-2 rounded text-xs text-gray-300 hover:text-white hover:border-red-600 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              OurFlix Indonesia
            </button>
          </div>
          <p className="mt-2 text-[10px] md:text-xs opacity-70">
            © 2026 OurFlix. Dikodekan dengan <span className="text-red-500 animate-pulse inline-block">❤️</span> oleh Nasyrun Adetiya khusus untuk hari lahir Anggy.
          </p>
        </div>
      </footer>

      {/* --- EASTER EGG ANIMATION --- */}
      <AnimatePresence>
        {showHearts && (
          <div className="fixed inset-0 pointer-events-none z-[100] flex justify-center items-end overflow-hidden">
            {heartsArray.map((_, i) => (
              <motion.div key={`heart-${i}`} initial={{ y: 100, opacity: 1, scale: 0.5, x: 0 }} animate={{ y: -1000, opacity: 0, scale: Math.random() * 1.5 + 0.8, x: (Math.random() - 0.5) * 400 }} transition={{ duration: Math.random() * 2 + 2.5, ease: "easeOut" }} className="absolute text-red-500 text-3xl md:text-5xl" style={{ left: `${Math.random() * 100}%` }}>❤️</motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* --- MODALS --- */}
      {/* 1. Modal Profil Anggy */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="absolute inset-0" onClick={() => setShowProfileModal(false)}></div>
            <motion.div initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }} className="relative bg-zinc-900 border border-zinc-700 rounded-xl w-full max-w-md overflow-hidden shadow-2xl z-10 max-h-[90vh] overflow-y-auto scrollbar-hide">
              <button onClick={() => setShowProfileModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl z-20">&times;</button>
              <div className="bg-gradient-to-r from-red-900 to-black p-6 md:p-8 flex flex-col items-center border-b border-zinc-800">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.5)] mb-3"><img src={anggyProfilePhotoUrl} alt="Anggy" className="w-full h-full object-cover" /></div>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">Anggy</h2>
                <span className="mt-2 px-3 py-1 bg-red-600 text-white text-[10px] md:text-xs font-bold rounded uppercase tracking-widest shadow-md">VIP Member</span>
              </div>
              <div className="p-6 md:p-8 space-y-5 md:space-y-6">
                <div><h3 className="text-xs md:text-sm text-gray-400 uppercase tracking-wider font-semibold mb-1">Status</h3><p className="text-white text-base md:text-lg">Pemeran Utama Kesayangan Adit</p></div>
                <div>
                  <h3 className="text-xs md:text-sm text-gray-400 uppercase tracking-wider font-semibold mb-2">Pesan Spesial</h3>
                  <div className="text-gray-200 space-y-3 font-light leading-relaxed text-sm md:text-base">
                    <p>Kamu adalah sosok yang selalu berhasil membawa ketenangan lewat kebaikan hati dan kesabaranmu yang luar biasa. Bagiku, kamu bukan sekadar pasangan, tapi juga pendengar paling sempurna untuk segala ceritaku.</p>
                    <p>Senyummu selalu punya cara magis untuk membuat hariku terasa lebih teduh. Ditambah lagi, kamu adalah partner paling seru, entah itu untuk sekadar asyik jajan berdua atau berpetualang mencari tempat-tempat baru.</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-zinc-800 text-center"><p className="text-red-500 font-serif italic text-base md:text-lg">"The best thing that ever happened to me."</p></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Modal Video Utama */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 md:p-10 backdrop-blur-sm">
            <button onClick={() => setShowVideoModal(false)} className="absolute top-4 md:top-5 right-4 md:right-8 text-white text-4xl md:text-5xl font-light hover:text-gray-400 z-50 transition">&times;</button>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-zinc-800">
              <iframe src={birthdayVideoUrl} className="w-full h-full outline-none border-none" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Modal Teks Ucapan */}
      <AnimatePresence>
        {showTextModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="absolute inset-0" onClick={() => setShowTextModal(false)}></div>
            <motion.div initial={{ y: 50, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0, scale: 0.9 }} transition={{ duration: 0.4, ease: "easeOut" }} className="relative max-w-2xl w-full bg-gradient-to-br from-zinc-900 to-[#0a0a0a] border border-yellow-600/30 rounded-xl md:rounded-2xl p-6 md:p-14 shadow-[0_0_50px_rgba(212,175,55,0.15)] text-center z-10 max-h-[90vh] overflow-y-auto scrollbar-hide">
              <button onClick={() => setShowTextModal(false)} className="absolute top-3 right-4 md:top-4 md:right-6 text-gray-400 hover:text-white text-2xl md:text-3xl transition">&times;</button>
              <h2 className="text-2xl md:text-5xl font-serif italic bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-4 md:mb-6 drop-shadow-sm leading-tight">"Selamat Ulang Tahun, Kesayanganku..."</h2>
              <div className="space-y-4 md:space-y-6 text-sm md:text-lg text-gray-300 leading-relaxed font-light mt-6 md:mt-8">
                <p>Di usiamu yang baru ini, aku ingin memberikan sesuatu yang sedikit berbeda. Bukan sekadar hadiah biasa, tapi sebuah mesin waktu kecil yang menyimpan potongan-potongan cerita terbaik kita.</p>
                <p>Terima kasih sudah selalu menjadi "pemeran utama" paling hebat dalam setiap skenario hidupku. Semoga di tanggal <strong className="text-yellow-500 font-normal">24 April</strong> ini dan seterusnya, membawa lebih banyak tawa, petualangan baru, dan mimpi-mimpi yang jadi nyata.</p>
              </div>
              <div className="mt-8 md:mt-10 flex items-center justify-center gap-3 md:gap-4 opacity-80">
                <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-yellow-600"></div><span className="text-yellow-600 text-[10px] md:text-xs tracking-[0.3em] uppercase">By Adit</span><div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-yellow-600"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Modal Video Khusus Foto */}
      <AnimatePresence>
        {activePhotoVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-md">
            <button onClick={() => setActivePhotoVideo(null)} className="absolute top-4 md:top-5 right-4 md:right-8 text-white text-4xl md:text-5xl font-light hover:text-gray-400 z-50 transition">&times;</button>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
              
              {activePhotoVideo.includes('youtube.com') ? (
                <iframe src={activePhotoVideo} className="w-full h-full outline-none border-none" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              ) : (
                <video className="w-full h-full outline-none" src={activePhotoVideo} controls autoPlay playsInline />
              )}
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}