# JanLabh (जनलाभ)

> **National Citizen Welfare Execution Workspace**  
> An in-browser cockpit that evaluates welfare eligibility and bridges the gap between scheme discovery and Direct Benefit Transfer (DBT) disbursement.

---

## Executive Summary

Government welfare discovery portals (like myScheme) address the information problem by listing schemes across central and state ministries. However, eligible citizens continue to drop out due to the execution problem—document fragmentation, complex eligibility jargon, and bureaucratic form friction.
JanLabh is an entitlement workspace built around a 100% client-side deterministic evaluation engine. It evaluates eligibility locally without server transmission, isolates guaranteed cash transfers from contingent credit facilities, and features a Cross-Scheme Gap Matrix that highlights the single highest-leverage missing document needed to unlock multiple welfare programs.

---

## What It Does

Unlike passive search directories, JanLabh focuses on **last-mile execution**:

* **Zero Data Leakage:** 100% in-browser deterministic evaluation. Demographic and income data never leave the device.
* **Benefit Radar:** Separates guaranteed direct cash transfers (DBT) from contingent credit facilities and insurance.
* **Cross-Scheme Gap Matrix:** Identifies the single highest-impact missing document that unlocks the most aid across multiple eligible schemes.
* **Rule Audit & Assisted Pre-Fill:** Features a transparent "Why Am I Eligible?" breakdown and generates copy-ready data packets for official ministry portals.
* **Execution Hub:** Tracks scheme progress through customizable lifecycle stages (*Discovered → Eligible → Docs Ready → Applied → Disbursed*).

---

## Tech Stack

* **Frontend:** HTML5, Vanilla JavaScript (ES6+)
* **Styling & UI:** Tailwind CSS, FontAwesome 6
* **State Management:** Web Storage API (`localStorage`)
* **Features:** i18n support (English, हिन्दी, বাংলা)

---


