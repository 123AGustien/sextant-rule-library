# 🛰 Modul Ketahanan Energi (ENG)

## Sextant Protocol – Ekstensi Rule Library

Modul **Ketahanan Energi (ENG)** adalah sistem keputusan terstruktur di dalam framework simulasi Sextant Protocol.

Modul ini memodelkan stabilitas sistem energi nasional dalam kondisi:
- Fluktuasi harga minyak dunia
- Tekanan harga CPO (minyak sawit)
- Tekanan subsidi bahan bakar
- Risiko ketergantungan impor energi

---

# 🧠 Tujuan

Modul ENG mensimulasikan bagaimana sistem energi nasional merespons guncangan melalui tiga lapisan kontrol:

1. Peredam guncangan jangka pendek  
2. Perlindungan fiskal negara  
3. Ketahanan struktural jangka panjang  

---

# ⚙ Struktur Solusi Nyata

## 1. 🔄 Lapisan Penyangga Harga (Jangka Pendek)

### Tujuan
Meredam guncangan pasar secara langsung agar tidak terjadi lonjakan ekstrem.

### Tindakan
- Penyesuaian rasio biodiesel (B40 ↔ B50)
- Penyesuaian subsidi sementara
- Mekanisme stabilisasi harga BBM

### Dampak
Mencegah transmisi langsung volatilitas harga global ke ekonomi domestik.

---

## 2. 💰 Lapisan Perlindungan Fiskal (Kontrol Anggaran)

### Tujuan
Mencegah pembengkakan subsidi dan ketidakseimbangan fiskal.

### Tindakan
- Rekalibrasi subsidi secara dinamis
- Penyesuaian pungutan ekspor (dana sawit)
- Pembatasan eksposur subsidi berdasarkan selisih harga minyak

### Dampak
Menjaga stabilitas anggaran negara di tengah tekanan biaya energi.

---

## 3. 🛢 Lapisan Ketahanan Energi (Jangka Panjang)

### Tujuan
Mengurangi ketergantungan struktural terhadap energi impor.

### Tindakan
- Membangun cadangan energi strategis
- Meningkatkan kapasitas produksi biodiesel dalam negeri
- Diversifikasi bahan baku (tidak hanya sawit)
- Mengurangi ketergantungan impor minyak mentah

### Dampak
Memperkuat kemandirian energi nasional secara berkelanjutan.

---

# 🧩 Perilaku Sistem

Modul ENG beroperasi dalam tiga mode:

- 🟢 NORMAL → efisiensi biaya
- 🟡 TRANSISI → penyesuaian seimbang
- 🔴 KONTINJENSI → prioritas ketahanan energi

---

# 🛰 Integrasi dengan Sistem SPD

Modul ENG terintegrasi dalam cockpit SPD bersama:

FX | DC | CYB | INF | ENG

Kontribusi modul:
- Skoring risiko
- Auto Suggest v2
- Simulasi dampak berantai
- Audit log sistem

---

# 🔄 Alur Keputusan

# 🛰 Energy Resilience Module (ENG)

## Sextant Protocol – Rule Library Extension

The **Energy Resilience Module (ENG)** is a governed decision system within the Sextant Protocol simulation framework.

It models national energy stability under conditions of:
- Oil price volatility
- Palm oil (CPO) price pressure
- Fuel subsidy stress
- Import dependency risk

---

# 🧠 Purpose

The ENG module simulates how a national energy system responds to shocks and maintains stability across three control layers:

1. Short-term shock absorption  
2. Fiscal stability protection  
3. Long-term structural resilience  

---

# ⚙ Real Solution Structure

## 1. 🔄 Price Buffer Layer (Short-term Stabilizer)

### Purpose
Absorb immediate market shocks and prevent sudden disruptions.

### Actions
- Adjust biodiesel blending ratio (B40 ↔ B50)
- Apply temporary subsidy adjustments
- Implement fuel price smoothing mechanisms

### Outcome
Prevents sudden transmission of global energy price volatility into domestic markets.

---

## 2. 💰 Fiscal Protection Layer (Budget Control)

### Purpose
Prevent subsidy system collapse and fiscal imbalance.

### Actions
- Dynamic subsidy recalibration
- Export levy adjustment (CPO fund balancing)
- Cap subsidy exposure per barrel price spread

### Outcome
Maintains government fiscal stability under energy cost pressure.

---

## 3. 🛢 Strategic Energy Layer (Long-Term Resilience)

### Purpose
Reduce structural dependency on external energy sources.

### Actions
- Build strategic fuel reserves
- Increase domestic biodiesel production capacity
- Diversify feedstock sources beyond palm oil
- Reduce crude oil import dependency

### Outcome
Strengthens long-term national energy independence.

---

# 🧩 System Behavior

The ENG module operates across three modes:

- 🟢 NORMAL → cost optimization and efficiency
- 🟡 TRANSITION → balancing supply, subsidy, and price
- 🔴 CONTINGENCY → energy security prioritization

---

# 🛰 Integration with SPD System

The ENG module integrates into the SPD cockpit alongside:

FX | DC | CYB | INF | ENG

It contributes to:
- Risk scoring
- Auto Suggest v2
- Cascade simulation
- Audit logging

---

# 🔄 Decision Flow