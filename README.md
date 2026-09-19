# DzynOS - Design Your Own OS
### Global Fashion Atelier Operating System

**Бренд:** DzynOS (Dzyn - light, OS - bold)
**Слоган:** Design. Drape. Deliver.
**Цель:** Топ-1 продукт для аренды платьев в мире.

## ФАЗА 0 - Фундамент [80% ✅]
- lib/patternCalculator.ts
- lib/fabricPresets.ts
- tsconfig + build fix
- [ ] public/models/mannequins/female.glb

## ФАЗА 1 - 3D Движок [NEXT]
- Smart Mannequin SMPL (♀/♂/Child в 1 файле)
- PBR материал из AI Fabric
- Pattern -> 3D Realtime (Shoulders/Back/Silhouette)
- Антикраш Viewer

## ФАЗА 2 - AI Интеллект
- AI Stylist по фото
- Auto Sewing Pattern PDF
- Cloth Physics

## ФАЗА 3 - Rental OS (монетизация)
- Календарь аренд / залог / химчистка
- Client Body Scan CRM
- P&L по каждому платью

## ФАЗА 4 - WOW (мировой уровень)
- AR 1:1 Mirror (WebXR)
- AI Video Lookbook
- Global Marketplace Баку -> Дубай
# DzynOS — Design Your Own Operating System
**Слоган:** Design. Drape. Deliver.
**Бренд:** DzynOS True Black v2.1
**Цель:** Топ-1 OS для ателье и аренды платьев

### ФАЗА 0 — Фундамент — 90% ✅ [ЗАКРЫВАЕМ СЕЙЧАС]
- [x] Структура app/dashboard/tools/3d/, lib/fabricPresets.ts, lib/patternCalculator.ts
- [x] Зависимости three / @react-three/fiber / drei / zustand
- [x] Фикс импортов../../../lib/ для Vercel
- [x] patternCalculator.ts - вектора лекал
- [x] fabricPresets.ts - база тканей
- [x] tsconfig build fix
- [x] Бренд и ROADMAP.md
- [ ] smart mannequin - финальный viewer.tsx без Lathe-костыля -> ТЫ ТУТ (2 мин)

### ФАЗА 1 — 3D Движок (AR 1:1) — 50%
- [x] viewer.tsx + ARViewer3D + Canvas + OrbitControls + свет
- [x] Умный манекен ♀/♂/Child в 1 файле без GLB
- [x] Подключение hex + fabric.roughness
- [ ] Кнопки FIT / POSE / MATERIALS как на референсе
- [ ] Pantone Realtime - клик по палитре = перекраска ткани на манекене сразу

### ФАЗА 2 — CAD TOOLS (тулбар)
- [x] TOOLS_LIST база (Select, Pen, Stitch) - UI есть
- [ ] Select - выделение точек
- [ ] Pen Tool - рисование Безье лекала
- [ ] Measure Tape - замер см (самое нужное!)
- [ ] Notch / Seam Allowance / Dart
- [ ] Grading S/M/L/XL

### ФАЗА 3 — Ткани и Цвет
- [x] Fabric DB UI карточки
- [ ] Физика драпировки от типа ткани (шелк vs бархат)
- [ ] Pantone поиск + HEX/RGB/CMYK

### ФАЗА 4 — Pattern Viewport
- [ ] SVG рендер лекал из patternCalculator.ts
- [ ] Сетка 5mm + снаппинг
- [ ] Live слайдер Shoulders -> вектора лекала

### ФАЗА 5 — Cost & Export
- [x] Калькулятор $ € £ ₼ ₽
- [ ] Export BOM / Tech Pack PDF для фабрики

### ФАЗА 6 — Rental OS (монетизация)
- [ ] Календарь аренд / залог / химчистка
- [ ] Client Body Scan CRM
- [ ] P&L по каждому платью

### ФАЗА 7 — WOW
- [ ] AR 1:1 Mirror WebXR
- [ ] AI Video Lookbook
- [ ] Global Marketplace
