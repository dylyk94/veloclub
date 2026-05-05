/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Bike {
  id: string;
  name: string;
  type: 'mountain' | 'road' | 'city' | 'electric';
  pricePerHour: number;
  image: string;
  description: string;
}

export interface RepairService {
  id: string;
  name: string;
  price: string;
  category: 'base' | 'advanced' | 'special';
}

export const BIKES: Bike[] = [
  {
    id: '1',
    name: 'GT Avalanche Comp',
    type: 'mountain',
    pricePerHour: 400,
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2022&auto=format&fit=crop',
    description: 'Классический горный хардтейл для лесных троп и парков.'
  },
  {
    id: '2',
    name: 'Cannondale Trail 5',
    type: 'mountain',
    pricePerHour: 500,
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?q=80&w=1948&auto=format&fit=crop',
    description: 'Выносливый байк для уверенного катания по пересеченной местности.'
  },
  {
    id: '3',
    name: 'Schwinn Racer',
    type: 'city',
    pricePerHour: 300,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop',
    description: 'Стильный синглспид для быстрых перемещений по городу.'
  },
  {
    id: '4',
    name: 'Welt Edelweiss',
    type: 'mountain',
    pricePerHour: 350,
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77891?q=80&w=2070&auto=format&fit=crop',
    description: 'Женский горный велосипед с комфортной геометрией рамы.'
  }
];

export const REPAIR_SERVICES: RepairService[] = [
  { id: 'r1', name: 'Полное ТО (Разборка/Смазка)', price: '3000 ₽', category: 'base' },
  { id: 'r2', name: 'Настройка переключателей', price: '450 ₽', category: 'base' },
  { id: 'r3', name: 'Прокачка гидравлического тормоза', price: '700 ₽', category: 'advanced' },
  { id: 'r4', name: 'Исправление восьмерки (колесо)', price: '600 ₽', category: 'base' },
  { id: 'r5', name: 'Переборка амортизационной вилки', price: '2000 ₽', category: 'special' },
  { id: 'r6', name: 'Чистка и смазка цепи/трансмиссии', price: '500 ₽', category: 'base' },
];
