# 🏆 Bounty Creation Wizard

A modern **multi-step Bounty Creation Platform** built with **React, Vite, Tailwind CSS & Redux Toolkit**.
This application simulates the real-world process of creating a bounty on a Web3 platform — capturing bounty metadata, reward model, timeline, and backer information.
After publishing, the user is taken to a confirmation screen and then a final screen showing the **backend-ready JSON payload**.

---

## 📌 Table of Contents

* [App Overview](#-app-overview)
* [Features](#-features)
* [Technology Stack](#-technology-stack)
* [Folder Structure](#-folder-structure)
* [Setup & Run Instructions](#-setup--run-instructions)
* [Build & Deployment](#-build--deployment)
* [Final JSON Payload Structure](#-final-json-payload-structure)
* [Assumptions / Limitations](#-assumptions--limitations)
* [Future Enhancements](#-future-enhancements)

---

## 🧭 App Overview

The bounty wizard consists of **three main steps**:

| Step                   | Description                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------- |
| **Basics**             | Title, description, project, bounty type, impact core, mode (digital/physical), location           |
| **Rewards & Timeline** | Reward token, payout distribution, SDGs, expiration date, impact certificate, estimated completion |
| **Backer**             | Sponsor details, logo, message, Terms & Conditions                                                 |

After publishing:
→ **Confirmation screen** simulates backend request
→ **Result screen** shows final bounty JSON

All form data is stored in **Redux**, so it stays persistent across navigation. Validation runs in real-time.

---

## ✨ Features

✔ **Three-step bounty creation wizard** (Basics → Rewards → Backer)
✔ **Responsive sidebar navigation with step locking logic**
✔ **Redux-powered state persistence** across navigation
✔ **Real-time validation with error messages**
✔ **Conditional inputs**

* Location visible only when *Physical* bounty is selected
* Backer fields visible only when sponsor toggle is enabled
* Certificate brief input only when certificate toggle is enabled

✔ **Automatic payout calculation**
✔ **Live preview panel** showing entered bounty details
✔ **Confirmation screen with loader** (simulated server call)
✔ **Result page displaying backend-ready JSON**
✔ **Reusable component-driven UI** (inputs, toggles, selects, number inputs, checkbox, etc.)
✔ **Scalable, production-grade folder structure**

---

---

### 🎨 UX / Design Decisions

- Validation errors are intentionally shown **only after the user attempts to move to the next step**, preventing cognitive overload and making the onboarding flow feel friendly rather than corrective.
- All form data is **persisted across step navigation**, ensuring users never lose progress — a common pain point in multi-step forms.
- Buttons remain **visible at all times and never disappear**, but navigation is disabled until the step is valid — maintaining clarity and reducing uncertainty about how to proceed.

---

## 🛠 Technology Stack

| Category         | Tools            |
| ---------------- | ---------------- |
| Framework        | React (Vite)     |
| State Management | Redux Toolkit    |
| Routing          | React Router     |
| Styling          | Tailwind CSS     |
| Language         | JavaScript (ES6) |
| Build Tool       | Vite             |

---

## 📂 Folder Structure

```
src
├─ app
│  ├─ router.jsx               # All app routes
│  └─ store.js                 # Redux store setup
│
├─ features
│  └─ bounty
│     ├─ layout
│     │  └─ BountyLayout.jsx   # Sidebar + progress dots + preview + <Outlet/>
│     ├─ components
│     │  ├─ PreviewPanel.jsx
│     │  ├─ ConfirmationScreen.jsx
│     │  ├─ ResultScreen.jsx
│     │  └─ steps
│     │     ├─ BasicsStep.jsx
│     │     ├─ RewardsStep.jsx
│     │     └─ BackerStep.jsx
│     ├─ redux
│     │  └─ bountySlice.js     # Complete bounty state + validity + finalPayload
│     ├─ validation
│     │  ├─ basicsValidation.js
│     │  ├─ rewardsValidation.js
│     │  └─ backerValidation.js
│     └─ utils
│        ├─ sdgs.js
│        └─ payloadMapper.js
│
├─ components
│  └─ ui                       # Reusable UI elements
│     ├─ TextInput.jsx
│     ├─ TextArea.jsx
│     ├─ Select.jsx
│     ├─ RadioGroup.jsx
│     ├─ Checkbox.jsx
│     ├─ Toggle.jsx
│     ├─ NumberInput.jsx
│     ├─ DateInput.jsx
│     └─ MultiSelectCheckbox.jsx
│
├─ index.css
└─ main.jsx
```

---

## 🔧 Setup & Run Instructions

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Dev server runs at:
➡ [http://localhost:5173/](http://localhost:5173/)

---

## 🧱 Build & Deployment

### Production Build

```bash
npm run build
```

### Deploy to Vercel

1. Push repo to **public GitHub**
2. Open [https://vercel.com](https://vercel.com) → **New Project**
3. Import the repo
4. Framework preset: **Vite**
5. Build command → `npm run build`
6. Output directory → `dist`

🔗 live deployment link here:

```
https://bounty-creation-wizard.vercel.app/add-bounty/basics
```

---

## 📌 Final JSON Payload Structure

Displayed on the **Result Page** after publishing:

```json
{
  "title": "Bounty Title",
  "description": "Bounty Description...",
  "projectTitle": "Project Title...",
  "type": "Development",
  "dominant_core": "Social",
  "mode": "digital",
  "location": "New York, USA",
  "reward": {
    "currency": "USD",
    "amount": 500,
    "winners": 1
  },
  "timeline": {
    "expiration_date": "2023-12-31T23:59:59.000Z",
    "estimated_completion": {
      "days": 2,
      "hours": 4,
      "minutes": 0
    }
  },
  "hasImpactCertificate": true,
  "impactBriefMessage": "Brief Message",
  "has_backer": true,
  "backer": {
    "name": "Sponsor Name",
    "logo": "<https://example.com/logo.png>",
    "message": "Sponsor message..."
  },
  "terms_accepted": true
}
```

---

## ⚠️ Assumptions / Limitations

* `setTimeout` is used to simulate a server request.
  In production, this would be replaced with a real API call.
* Backer logo is stored as a **File** in Redux. In real applications, it would be uploaded separately to generate a URL.
* Step validation rules are implemented; if required, validation can be made stricter or softer from the validation files.

---

## 💡 Future Enhancements

* Auto-save drafts to localStorage
* Drag & Drop + preview for logo upload
* Support for multiple bounty reward tokens
* i18n (multiple languages)
* Dark mode

---

### 🎉 Thank you for reviewing this assignment!
