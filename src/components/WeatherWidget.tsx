import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cloud, Sun, CloudRain, Wind, ChevronDown, ChevronUp, Droplets, Gauge } from 'lucide-react';

interface WeatherData {
  daily: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    windspeed_10m_max: number[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    windspeed_10m: number[];
    weathercode: number[];
  };
}

const WEATHER_ICONS: Record<number, React.ReactNode> = {
  0: <Sun className="text-brand-primary" />,
  1: <Sun className="text-brand-primary opacity-80" />,
  2: <Cloud className="text-white/60" />,
  3: <Cloud className="text-white/40" />,
  45: <Cloud className="text-white/30" />,
  48: <Cloud className="text-white/30" />,
  51: <CloudRain className="text-blue-400" />,
  61: <CloudRain className="text-blue-500" />,
  71: <CloudRain className="text-white/80" />, // Snow
  95: <CloudRain className="text-purple-400" />, // Thunder
};

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        // Ulan-Ude coords: 51.8335, 107.5848
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=51.8335&longitude=107.5848&hourly=temperature_2m,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max&timezone=auto'
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="p-12 border-b border-white/10 flex items-center justify-center h-[500px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">ЗАГРУЗКА МЕТЕОДАННЫХ...</span>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="border-b border-white/10 flex flex-col relative overflow-hidden bg-black">
      {/* Header */}
      <div className="p-8 md:p-12 border-b border-white/5 flex justify-between items-end relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse" />
            <span className="font-mono text-[10px] text-brand-primary uppercase tracking-[0.3em] font-black">УЛАН-УДЭ // МЕТЕОСТАНЦИЯ</span>
          </div>
          <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-none">ПРОГНОЗ<br />КАТАНИЯ</h2>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[10px] font-mono opacity-30 uppercase tracking-widest mb-1">Статус: Активен</p>
          <p className="text-[10px] font-mono text-brand-primary uppercase tracking-widest">ТОЧНЫЕ ДАННЫЕ</p>
        </div>
      </div>

      <div className="flex flex-col relative z-20">
        {weather.daily.time.slice(0, 7).map((time, idx) => {
          const isSelected = selectedDay === idx;
          const date = new Date(time);
          const dayName = date.toLocaleDateString('ru-RU', { weekday: 'short' }).toUpperCase();
          const dayNum = date.getDate();
          
          return (
            <div key={idx} className="border-b border-white/5 last:border-0">
              <button 
                onClick={() => setSelectedDay(isSelected ? null : idx)}
                className={`w-full grid grid-cols-4 md:grid-cols-6 items-center p-6 md:px-12 hover:bg-white/[0.02] transition-all group ${isSelected ? 'bg-brand-primary/[0.03]' : ''}`}
              >
                <div className="flex items-baseline gap-3">
                  <span className={`text-sm font-mono font-bold ${isSelected ? 'text-brand-primary' : 'opacity-40'}`}>{dayName}</span>
                  <span className="text-xl font-black italic tracking-tighter">{dayNum}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-brand-primary">
                    {WEATHER_ICONS[weather.daily.weathercode[idx]] || <Sun />}
                  </div>
                </div>

                <div className="flex flex-col items-start">
                  <span className="text-[9px] font-mono opacity-30 uppercase mb-1">Темп</span>
                  <span className="text-sm font-black">{Math.round(weather.daily.temperature_2m_max[idx])}°</span>
                </div>

                <div className="hidden md:flex flex-col items-start">
                  <span className="text-[9px] font-mono opacity-30 uppercase mb-1">Ветер макс</span>
                  <span className="text-sm font-bold text-blue-400">{weather.daily.windspeed_10m_max[idx]} <span className="text-[8px] opacity-50 uppercase">м/с</span></span>
                </div>

                <div className="hidden md:flex flex-col items-start overflow-hidden">
                  <div className="h-1 w-full bg-white/5 rounded-full relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, Math.max(0, (weather.daily.temperature_2m_max[idx] + 10) * 2))}%` }}
                      className="absolute inset-0 bg-brand-primary opacity-30 rounded-full"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  {isSelected ? <ChevronUp size={16} className="opacity-20" /> : <ChevronDown size={16} className="opacity-20 group-hover:opacity-100 transition-opacity" />}
                </div>
              </button>

              <AnimatePresence>
                {isSelected && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-white/[0.01]"
                  >
                    <div className="p-6 md:p-12 pt-0">
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 py-8 border-t border-white/5">
                        {weather.hourly.time
                          .slice(idx * 24 + 10, idx * 24 + 19) // 10:00 to 18:00
                          .filter((_, i) => i % 1 === 0) // all hours in working range
                          .map((hTime, hIdx) => {
                            const globalHIdx = idx * 24 + 10 + hIdx;
                            const hour = new Date(hTime).getHours();
                            return (
                              <div key={hIdx} className="flex flex-col items-center p-4 border border-white/5 bg-black/40 rounded-none relative group/hour">
                                <span className="text-[9px] font-mono text-white/30 mb-3 group-hover/hour:text-brand-primary transition-colors">{hour}:00</span>
                                <div className="mb-3 scale-75">
                                  {WEATHER_ICONS[weather.hourly.weathercode[globalHIdx]] || <Sun />}
                                </div>
                                <span className="text-lg font-black tracking-tighter mb-1">{Math.round(weather.hourly.temperature_2m[globalHIdx])}°</span>
                                <div className="flex items-center gap-1 mt-auto">
                                  <Wind size={10} className="text-blue-400 opacity-60" />
                                  <span className="text-[10px] font-bold text-blue-400">{weather.hourly.windspeed_10m[globalHIdx]}</span>
                                  <span className="text-[7px] font-mono opacity-30">м/с</span>
                                </div>
                              </div>
                            );
                        })}
                      </div>
                      
                      <div className="flex flex-wrap gap-8 text-[9px] font-mono uppercase tracking-[0.2em] text-white/40 border-t border-white/5 pt-8">
                        <div className="flex items-center gap-2">
                           <Droplets size={12} className="text-blue-400" />
                           ВЛАЖНОСТЬ: {weather.daily.weathercode[idx] > 50 ? 'ВЫСОКАЯ' : 'ОПТИМАЛЬНО'}
                        </div>
                        <div className={`flex items-center gap-2 ${
                            weather.daily.weathercode[idx] > 50 
                              ? 'text-orange-500' 
                              : weather.daily.windspeed_10m_max[idx] > 8 
                                ? 'text-yellow-500'
                                : 'text-brand-primary'
                        }`}>
                           <Gauge size={12} />
                           {(() => {
                             const code = weather.daily.weathercode[idx];
                             const wind = weather.daily.windspeed_10m_max[idx];
                             const temp = weather.daily.temperature_2m_max[idx];
                             
                             if (code > 50) return 'РЕКОМЕНДУЕМ ПОСЕТИТЬ МАСТЕРСКУЮ (ОСАДКИ)';
                             if (wind > 10) return 'ВНИМАНИЕ: ОПАСНЫЙ ВЕТЕР ДЛЯ КАТАНИЯ';
                             if (wind > 7) return 'СИЛЬНЫЙ ВЕТЕР: БЕРЕГИТЕСЬ ОТКРЫТЫХ ТРАСС';
                             if (temp > 28) return 'ЖАРКО: НЕ ЗАБУДЬТЕ ЗАПАС ВОДЫ';
                             if (temp < 10) return 'ПРОХЛАДНО: ВРЕМЯ ТЕРМОБЕЛЬЯ';
                             return 'ИДЕАЛЬНО ДЛЯ КРОСС-КАНТРИ И ШОССЕ';
                           })()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Decorative Background Element */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-primary opacity-[0.02] blur-[100px] pointer-events-none rounded-full" />
    </div>
  );
}
