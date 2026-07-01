# 🛰 ENG Module Operator Manual
## Sextant Protocol v12 — Energy Resilience Cockpit

---

# 🇮🇩 BAHASA INDONESIA

## 📘 Gambaran Umum
Modul **ENG (Ketahanan Energi)** mensimulasikan kondisi sistem energi nasional berdasarkan:

- Harga minyak dunia  
- Harga CPO (minyak sawit)  
- Tekanan subsidi BBM  
- Cadangan energi nasional  
- Ketergantungan impor energi  

---

## 🧭 Cara Mengoperasikan Sistem

### 🟢 LANGKAH 1 — Buka Cockpit
Buka: `index.html`

Pastikan:
- SPD v12 dashboard aktif  

- Tile ENG terlihat di layar  

---

### 🟡 LANGKAH 2 — Input State Sistem

```js
state = {
  oilPrice: 80,
  cpoPrice: 1100,
  fiscalPressure: 0.5,
  reserveLevel: 0.6,
  importDependency: 0.4,
  biofuelCapacity: 0.6
}