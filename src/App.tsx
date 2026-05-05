/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bike as BikeIcon, 
  Wrench, 
  Clock, 
  MapPin, 
  Phone, 
  ChevronRight, 
  X, 
  Menu,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ExternalLink,
  MessageCircle,
  Instagram,
  Mail
} from 'lucide-react';
import { WeatherWidget } from './components/WeatherWidget';
import { BIKES, REPAIR_SERVICES, Bike, RepairService } from './types';

export default function App() {
  const [selectedSection, setSelectedSection] = useState<'home' | 'rental' | 'repair'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookingItem, setBookingItem] = useState<{ type: 'rental' | 'repair', name: string } | null>(null);

  const navItems = [
    { id: 'home', label: 'Главная', icon: <MapPin size={18} /> },
    { id: 'rental', label: 'Аренда', icon: <BikeIcon size={18} /> },
    { id: 'repair', label: 'Сервис', icon: <Wrench size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans selection:bg-brand-primary selection:text-black">
      {/* Vertical Branding Rail */}
      <div className="fixed left-0 top-0 h-full w-16 border-r border-white/10 flex items-center justify-center z-50 bg-[#111111]">
        <p className="rotate-180 uppercase tracking-[0.4em] text-[10px] font-bold opacity-40 vertical-text py-8">
          ВелоДом — велокультура Улан-Удэ — С 2012 года
        </p>
      </div>

      {/* Navigation */}
      <nav className="ml-16 h-24 border-b border-white/10 flex items-center justify-between px-6 md:px-12 sticky top-0 bg-[#111111]/80 backdrop-blur-md z-40">
        <div className="flex items-baseline gap-2 cursor-pointer" onClick={() => setSelectedSection('home')}>
          <span className="text-2xl font-black tracking-tighter uppercase whitespace-nowrap">ВЕЛОДОМ</span>
          <span className="text-brand-primary font-mono text-[10px] uppercase tracking-widest hidden sm:inline">[_03_]</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] font-bold">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedSection(item.id as any)}
              className={`transition-colors hover:text-brand-primary ${
                selectedSection === item.id ? 'text-brand-primary' : 'text-white/60'
              }`}
            >
              {item.label}
            </button>
          ))}
          <a 
            href="tel:+73012610011"
            className="text-brand-primary border border-brand-primary/20 px-4 py-2 hover:bg-brand-primary hover:text-black transition-all"
          >
            +7 (3012) 61-00-11
          </a>
        </div>

        <button 
          className="md:hidden p-2 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 z-50 bg-[#111111] pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedSection(item.id as any);
                    setIsMenuOpen(false);
                  }}
                  className="text-4xl font-black uppercase tracking-tighter"
                >
                  {item.label}
                </button>
              ))}
              <div className="h-px bg-white/10 my-4" />
              <a href="tel:+73012610011" className="text-xl font-mono text-brand-primary">+7 (3012) 61-00-11</a>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-white"><X size={32} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="ml-16">
        <AnimatePresence mode="wait">
          {selectedSection === 'home' && (
            <React.Fragment key="home">
              <HomeSection onRent={() => setSelectedSection('rental')} onRepair={() => setSelectedSection('repair')} />
              <LocationSection />
            </React.Fragment>
          )}
          {selectedSection === 'rental' && (
            <React.Fragment key="rental">
              <RentalSection onBook={(name) => setBookingItem({ type: 'rental', name })} />
            </React.Fragment>
          )}
          {selectedSection === 'repair' && (
            <React.Fragment key="repair">
              <RepairSection onBook={(name) => setBookingItem({ type: 'repair', name })} />
            </React.Fragment>
          )}
        </AnimatePresence>
      </main>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingItem(null)}
              className="absolute inset-0 bg-[#111111]/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-[#111111] border border-white/10 w-full max-w-xl p-10 overflow-hidden rounded-sm"
            >
              <div className="absolute top-0 right-0 p-12 opacity-10 font-black text-8xl select-none uppercase -mr-8 -mt-8 pointer-events-none">ЗАПИСЬ</div>
              
              <button 
                onClick={() => setBookingItem(null)}
                className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors z-20"
              >
                <X size={20} />
              </button>
              
              <div className="mb-8 relative z-10">
                <h3 className="text-4xl font-black uppercase tracking-tighter mb-2 italic">ЗАБРОНИРОВАТЬ</h3>
                <p className="text-brand-primary text-xs font-mono uppercase tracking-[0.2em]">{bookingItem.name}</p>
              </div>

              {/* Promo Offer */}
              <div className="mb-8 p-4 bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-between group">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary">СПЕЦПРЕДЛОЖЕНИЕ</p>
                  <p className="text-sm font-bold uppercase tracking-tighter">-10% НА ПЕРВЫЙ СЕРВИС</p>
                </div>
                <div className="text-2xl font-black italic text-brand-primary opacity-50 group-hover:opacity-100 transition-opacity">АКЦИЯ</div>
              </div>

              <form className="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); alert('Заявка отправлена!'); setBookingItem(null); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">ВАШЕ ИМЯ</label>
                    <input required type="text" className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-brand-primary outline-none transition-all placeholder:text-white/10 font-medium" placeholder="ИМЯ" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">ТЕЛЕФОН</label>
                    <input required type="tel" className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-brand-primary outline-none transition-all placeholder:text-white/10 font-mono" placeholder="+7 (___) ___-__-__" />
                  </div>
                </div>
                
                <div className="space-y-6">
                  {bookingItem.type === 'rental' ? (
                    <>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">ДАТА АРЕНДЫ</label>
                        <input required type="date" className="w-full bg-zinc-900 border border-white/10 px-4 py-3 text-white focus:border-brand-primary outline-none transition-all font-mono text-sm uppercase" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">ВРЕМЯ АРЕНДЫ</label>
                          <span className="text-[9px] font-mono text-brand-primary uppercase">РАБОТАЕМ: 10:00 — 19:00</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-white/20 font-mono">С</span>
                            <input required type="time" min="10:00" max="19:00" className="w-full bg-zinc-900 border border-white/10 pl-8 pr-4 py-3 text-white focus:border-brand-primary outline-none transition-all font-mono text-sm" />
                          </div>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-white/20 font-mono">ДО</span>
                            <input required type="time" min="10:00" max="19:00" className="w-full bg-zinc-900 border border-white/10 pl-10 pr-4 py-3 text-white focus:border-brand-primary outline-none transition-all font-mono text-sm" />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">ДАТА ПРИЕЗДА</label>
                        <input required type="date" className="w-full bg-zinc-900 border border-white/10 px-4 py-3 text-white focus:border-brand-primary outline-none transition-all font-mono text-sm uppercase" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">ВРЕМЯ</label>
                          <span className="text-[9px] font-mono text-brand-primary uppercase">РАБОТАЕМ: 10:00 — 19:00</span>
                        </div>
                        <input required type="time" min="10:00" max="19:00" className="w-full bg-zinc-900 border border-white/10 px-4 py-3 text-white focus:border-brand-primary outline-none transition-all font-mono text-sm" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/5">
                  <button type="submit" className="w-full bg-brand-primary text-black py-6 font-black uppercase tracking-widest text-xs hover:bg-white transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    ОТПРАВИТЬ ЗАЯВКУ 
                    <span className="text-lg">↗</span>
                  </button>
                  <p className="text-[9px] text-white/20 text-center mt-4 uppercase tracking-[0.1em]">Нажимая кнопку, вы соглашаетесь на обработку персональных данных</p>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="ml-16 border-t border-white/10 py-20 px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <div className="flex items-baseline gap-2">
              <h4 className="text-4xl font-black uppercase tracking-tighter italic whitespace-nowrap">ВЕЛОДОМ</h4>
              <span className="text-brand-primary font-mono text-[8px] uppercase tracking-widest opacity-40">[_03_]</span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              Профессиональное обслуживание и аренда велосипедов в Улан-Удэ. Более 10 лет опыта в велоиндустрии.
            </p>
          </div>
          
          <div className="space-y-6">
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-brand-primary">КОНТАКТЫ</h5>
            <div className="space-y-2">
              <p className="text-sm font-medium italic serif-italic underline decoration-brand-primary">Улан-Удэ, ул. Сахьяновой, 9/1</p>
              <p className="text-sm font-medium italic serif-italic underline decoration-brand-primary">Улан-Удэ, ул. Жердева, 15</p>
              <a 
                href="https://vk.com/velodom_uu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm opacity-60 hover:text-brand-primary transition-all flex items-center gap-2 group"
              >
                vk.com/velodom_uu
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
              </a>
            </div>
          </div>

          <div className="space-y-6 text-right md:text-left">
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-brand-primary">ВРЕМЯ</h5>
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest">ПН — ВС</p>
              <p className="text-xs opacity-60 font-mono">10:00 — 19:00</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomeSection({ onRent, onRepair }: { onRent: () => void, onRepair: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-6rem)] flex flex-col md:flex-row border-b border-white/10"
    >
      {/* Left Column - Hero */}
      <div className="flex-1 md:w-3/5 p-8 md:p-16 flex flex-col justify-between relative overflow-hidden bg-black">
        <div className="absolute -bottom-24 -left-20 text-[350px] font-black italic text-white/[0.03] select-none pointer-events-none leading-none tracking-tighter">УУ</div>
        <div className="absolute top-0 right-0 p-12 opacity-5 font-black text-[15vw] leading-none pointer-events-none uppercase tracking-widest select-none font-mono">03</div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 text-brand-primary border border-brand-primary/20 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8">
            <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse" />
            ОТКРЫТО 10:00 — 19:00
          </div>
          <h1 className="text-[12vw] md:text-[100px] leading-[0.85] font-black tracking-tighter uppercase mb-10">
            КРУТИ<br />
            <span className="text-brand-primary">ВПЕРЕД</span>
          </h1>
          <p className="max-w-md text-white/50 text-lg md:text-xl leading-relaxed mb-10">
            Профессиональное обслуживание и аренда городских и шоссейных велосипедов. Мастерство, воплощенное в металле.
          </p>

          {/* New Content to fill space */}
          <div className="grid grid-cols-2 gap-8 mb-12 max-w-sm">
            <div className="border-l border-white/10 pl-4 py-2">
              <span className="block text-[8px] font-mono text-white/30 uppercase tracking-[0.2em] mb-1">Статус цеха</span>
              <span className="block text-xl font-bold italic tracking-tighter">В РАБОТЕ: 12</span>
            </div>
            <div className="border-l border-white/10 pl-4 py-2">
              <span className="block text-[8px] font-mono text-white/30 uppercase tracking-[0.2em] mb-1">Загрузка</span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold italic tracking-tighter">85%</span>
                <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-brand-primary"></div>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={onRepair}
            className="w-32 h-32 border border-brand-primary rounded-full flex items-center justify-center p-4 relative group transition-all hover:bg-brand-primary hover:text-black mb-12"
          >
            <div className="absolute inset-0 border border-brand-primary/30 rounded-full animate-ping group-hover:hidden transition-all"></div>
            <span className="text-[10px] uppercase font-black text-center tracking-tight leading-none">ЗАБРОНИРОВАТЬ СЕРВИС ↗</span>
          </button>

          <div className="flex items-center gap-12 mt-auto">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Master Service</span>
              </div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">СИСТЕМЫ: ГОТОВНОСТЬ 100%</p>
            </div>
            <div className="hidden sm:block space-y-1 border-l border-white/5 pl-8">
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Workshop Load</span>
              </div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">ОЧЕРЕДЬ: 2-3 ДНЯ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Service Blocks & Weather */}
      <div className="md:w-2/5 border-l border-white/10 flex flex-col">
        <div 
          onClick={onRepair}
          className="p-12 bg-white/5 md:bg-transparent border-b border-white/10 group cursor-pointer hover:bg-brand-primary hover:text-black transition-all duration-500"
        >
          <div className="flex justify-between items-start mb-10">
            <span className="font-mono text-[10px] opacity-40 uppercase tracking-widest">01 / СЕРВИС</span>
            <span className="text-2xl transition-transform group-hover:translate-x-2 group-hover:-translate-y-2">↗</span>
          </div>
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 italic group-hover:not-italic transition-all">РЕМОНТ</h2>
          <p className="text-sm opacity-50 group-hover:opacity-100 transition-opacity max-w-xs">
            Тюнинг, переборка вилок, настройка трансмиссии и полное ТО за 24 часа.
          </p>
        </div>

        <div 
          onClick={onRent}
          className="p-12 bg-white/5 md:bg-transparent border-b border-white/10 group cursor-pointer hover:bg-white hover:text-black transition-all duration-500"
        >
          <div className="flex justify-between items-start mb-10">
            <span className="font-mono text-[10px] opacity-40 uppercase tracking-widest">02 / ПРОКАТ</span>
            <span className="text-2xl transition-transform group-hover:translate-x-2 group-hover:-translate-y-2">↗</span>
          </div>
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 italic group-hover:not-italic transition-all">АРЕНДА</h2>
          <p className="text-sm opacity-50 group-hover:opacity-100 transition-opacity max-w-xs">
            От легких фиксов до мощных гравийников. Тарифы от 500₽ за час.
          </p>
        </div>

        <WeatherWidget />

        <div className="h-32 bg-[#111111] flex items-center justify-center overflow-hidden border-b border-white/10 mt-auto">
          <p className="font-mono text-[9px] opacity-10 uppercase tracking-[0.5em] whitespace-nowrap">ПРОФЕССИОНАЛЬНЫЙ СЕРВИС // НАДЕЖНОЕ СНАРЯЖЕНИЕ</p>
        </div>
      </div>
    </motion.div>
  );
}

function LocationSection() {
  return (
    <section className="px-8 md:px-16 py-24 border-t border-white/10 bg-zinc-900/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-12 opacity-5 font-black text-8xl rotate-90 select-none pointer-events-none">КАРТА</div>
      
      <div className="grid lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5 space-y-12 relative z-10">
          <div>
            <span className="font-mono text-[10px] text-brand-primary uppercase tracking-[0.3em] mb-4 block">СЕТЬ // УЛАН-УДЭ</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic mb-8 leading-none">НАШИ<br />ТОЧКИ</h2>
            <p className="text-lg text-white/40 leading-relaxed max-w-sm">
              Два современных сервисных центра в ключевых точках города. Удобный подъезд и парковка для вашего байка.
            </p>
          </div>

          <div className="space-y-10">
            {[
              { 
                name: 'ЭТНОГРАФИЧЕСКИЙ МУЗЕЙ', 
                addr: 'ул. Этнографический Музей, 259а', 
                desc: 'Летний пункт проката (киоск)',
                phone: '+7 (983) 333-44-73',
                link: 'https://yandex.ru/maps/?text=Улан-Удэ%20ул%20Этнографический%20Музей%20259а'
              },
              { 
                name: 'ВЕЛОДОМ ПРИРЕЧНАЯ', 
                addr: 'Приречная улица, 8Б', 
                desc: 'Пункт проката',
                phone: '+7 (924) 557-56-59',
                link: 'https://yandex.ru/maps/?text=Улан-Удэ%20Приречная%20улица%208Б'
              },
              { 
                name: 'ВЕЛОДОМ ИППОДРОМ', 
                addr: 'Площадка перед ипподромом', 
                desc: 'Пункт проката (Ж/Д район)',
                phone: '+7 (983) 333-44-73',
                link: 'https://yandex.ru/maps/?text=Улан-Удэ%20ипподром'
              }
            ].map((loc, i) => (
              <div key={i} className="group cursor-default border-l-2 border-white/10 pl-8 hover:border-brand-primary transition-all">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-1 group-hover:text-brand-primary transition-colors">{loc.name}</h3>
                <a href={`tel:${loc.phone.replace(/\D/g, "")}`} className="text-xl font-mono font-bold text-white block mb-2 hover:text-brand-primary transition-colors">
                  {loc.phone}
                </a>
                <p className="text-[11px] uppercase tracking-widest opacity-40 mb-4">{loc.addr}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono uppercase tracking-widest opacity-30">{loc.desc}</span>
                  <a 
                    href={loc.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold uppercase tracking-widest text-brand-primary border-b border-brand-primary/50 hover:border-brand-primary transition-all"
                  >
                    ОТКРЫТЬ В КАРТАХ ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 h-[500px] bg-zinc-900 border border-white/10 grayscale relative group">
          <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
          <div className="absolute inset-4 border border-white/5 pointer-events-none z-20" />
          
          {/* Static Map Representation for aesthetic - In real scenario would be 2GIS/Google iframe */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11364.550181515092!2d107.60!3d51.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d0607da19777777%3A0x7777777777777777!2z0YPQuy4g0KHQsNGF0YzRj9C90L7QstC-0LksIDksINCj0LvQsNC9LdCj0LTQtSwg0KDQtdGB0L8uINCR0YPRgNGP0YLQuNGPLCA2NzAwMTM!5e0!3m2!1sru!2sru!4v1714900000000!5m2!1sru!2sru&maptype=satellite"
            className="w-full h-full opacity-40 group-hover:opacity-80 transition-opacity filter invert grayscale contrast-125"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          
          <div className="absolute bottom-8 left-8 right-8 bg-[#111111]/90 backdrop-blur p-6 border border-white/10 z-30">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-primary flex items-center justify-center font-black text-black text-xs italic">OFF</div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">ИНТЕРАКТИВНАЯ КАРТА БУДЕТ ДОСТУПНА ПОСЛЕ ТЕХОБСЛУЖИВАНИЯ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 bg-technical-bg/50 rounded-3xl border border-technical-ink/5 hover:border-brand-primary/30 transition-all group">
      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-primary mb-6 shadow-sm group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function RentalSection({ onBook }: { onBook: (name: string) => void }) {
  const [filter, setFilter] = useState<'all' | Bike['type']>('all');
  const filteredBikes = filter === 'all' ? BIKES : BIKES.filter(b => b.type === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="px-8 md:px-16 py-16"
    >
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 border-b border-white/10 pb-12">
        <div>
          <span className="font-mono text-[10px] text-brand-primary uppercase tracking-[0.3em] mb-4 block">МОДЕЛИ В НАЛИЧИИ</span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic">ПРОКАТ</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {['all', 'mountain', 'city', 'road', 'electric'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`px-4 py-2 font-mono text-[10px] uppercase tracking-widest border transition-all ${
                filter === type 
                ? 'bg-brand-primary text-black border-brand-primary' 
                : 'border-white/10 text-white/40 hover:border-white/40 hover:text-white'
              }`}
            >
              {type === 'all' ? '[ ALL ]' : `[ ${type.toUpperCase()} ]`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
        {filteredBikes.map((bike) => (
          <motion.div 
            layout
            key={bike.id}
            className="group cursor-pointer"
            onClick={() => onBook(bike.name)}
          >
            <div className="aspect-[16/10] overflow-hidden bg-zinc-900 border border-white/5 relative mb-6">
              <img 
                src={bike.image} 
                alt={bike.name}
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-brand-primary">
                {bike.type === 'mountain' ? 'ГОРНЫЙ' : bike.type === 'city' ? 'ГОРОДСКОЙ' : bike.type === 'road' ? 'ШОССЕЙНЫЙ' : 'ЭЛЕКТРО'}
              </div>
            </div>
            <div className="flex justify-between items-baseline border-b border-white/5 pb-4 mb-4">
              <h3 className="text-3xl font-black uppercase tracking-tighter group-hover:text-brand-primary transition-colors">{bike.name}</h3>
              <span className="text-xl font-mono text-brand-primary">{bike.pricePerHour}₽</span>
            </div>
            <p className="text-sm text-white/40 mb-6 font-medium italic serif-italic group-hover:text-white/70 transition-colors">{bike.description}</p>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/30 group-hover:text-brand-primary">
              ЗАБРОНИРОВАТЬ <span className="text-sm transition-transform group-hover:translate-x-1">↗</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function RepairSection({ onBook }: { onBook: (name: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="px-8 md:px-16 py-16"
    >
      <div className="grid lg:grid-cols-12 gap-20">
        <div className="lg:col-span-5 space-y-12">
          <div>
            <span className="font-mono text-[10px] text-brand-primary uppercase tracking-[0.3em] mb-4 block">ТЕХНИЧЕСКАЯ СТУДИЯ</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic mb-8 leading-none">СЕРВИС<br />МАСТЕРОВ</h2>
            <p className="text-lg text-white/40 leading-relaxed max-w-sm">
              Мы разбираем велосипед до последнего винтика, чтобы убедиться в его идеальной работе. Технологии и страсть в каждом движении ключа.
            </p>
          </div>

          <div className="space-y-6 pt-12 border-t border-white/10">
            <div className="flex items-center justify-between group cursor-pointer" onClick={() => onBook('Консультация')}>
              <span className="text-sm font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-brand-primary transition-all">ДИАГНОСТИКА БЕСПЛАТНО</span>
              <span className="text-lg group-hover:translate-x-2 transition-transform opacity-30 group-hover:opacity-100">↗</span>
            </div>
            <div className="flex items-center justify-between group cursor-pointer" onClick={() => onBook('Консультация')}>
              <span className="text-sm font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-brand-primary transition-all">СРОЧНЫЙ РЕМОНТ</span>
              <span className="text-lg group-hover:translate-x-2 transition-transform opacity-30 group-hover:opacity-100">↗</span>
            </div>
            <div className="flex items-center justify-between group cursor-pointer" onClick={() => onBook('Приоритетная запись')}>
              <span className="text-sm font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-brand-primary transition-all">ГАРАНТИЯ 3.0</span>
              <span className="text-lg group-hover:translate-x-2 transition-transform opacity-30 group-hover:opacity-100">↗</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-[#111111] border border-white/10 relative">
            <div className="absolute inset-0 technical-grid pointer-events-none opacity-50" />
            <div className="relative z-10">
              <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 bg-zinc-900/50">
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-primary whitespace-nowrap">ПРАЙС-ЛИСТ 2024</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/20">НДС ВКЛЮЧЕН</span>
              </div>
              
              <div className="divide-y divide-white/10">
                {REPAIR_SERVICES.map((service) => (
                  <div 
                    key={service.id}
                    onClick={() => onBook(service.name)}
                    className="flex justify-between items-center py-6 px-8 hover:bg-brand-primary hover:text-black transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-6">
                      <span className="font-mono text-[10px] opacity-20 group-hover:opacity-50 tracking-tighter">[{service.id}]</span>
                      <span className="text-2xl font-black tracking-tighter uppercase whitespace-normal">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-6 shrink-0">
                      <span className="font-mono font-bold">{service.price}</span>
                      <span className="text-xl transition-transform group-hover:scale-125">↗</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 p-10 bg-brand-primary text-black flex flex-col md:flex-row items-center justify-between gap-8 group cursor-pointer" onClick={() => onBook('Консультация')}>
            <div>
              <h3 className="text-4xl font-black uppercase tracking-tighter italic mb-2">ЕСТЬ ВОПРОСЫ?</h3>
              <p className="font-bold text-xs uppercase tracking-widest opacity-60">КОНСУЛЬТАЦИЯ С МАСТЕРОМ В ОДИН КЛИК</p>
            </div>
            <div className="text-6xl font-black opacity-10 group-hover:opacity-100 transition-opacity translate-x-4">↗</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
