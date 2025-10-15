# 🧵 Bobbin — Firebase Auth + CRUD Demo

Bobbin is a minimal full-stack demo app that explores **Firebase Authentication** and **Firestore-backed CRUD operations** in a simple “list” interface.

Originally built as a personal learning project to understand Firebase end-to-end — from Auth to data persistence — it demonstrates how to scaffold a secure, reactive app with minimal configuration.

---

## 🚀 Features

- **Firebase Authentication (Email/Password)**
  - Login gated via Firebase Auth.
  - Protected routes through `onAuthStateChanged()`.
  - All CRUD operations require an authenticated session.

- **Firestore Data Storage**
  - Simple `items` collection schema.
  - Real-time snapshot updates.
  - Full CRUD: Create, Read, Update, Delete.

- **Client-side State**
  - Lightweight front-end state management using vanilla JS.
  - Conditional rendering based on user authentication.

- **Secure-by-default**
  - Firestore rules enforce authentication on all reads and writes.
  - No exposed secrets or public endpoints.
  - Minimal surface area for misuse — a “Hello, World” that respects cloud security best practices.

---

## 🧠 Architecture Overview

```

/ (root)
├── public/
│   ├── index.html        # App shell + Firebase SDK imports
│   ├── app.js            # Auth listener + CRUD logic
│   └── style.css         # Minimal UI styling
├── firebase.json         # Hosting + rules configuration
├── firestore.rules       # Database access rules
└── README.md

````

### Core Flow

1. **Authentication**
   - Firebase initializes with environment config.
   - On login, Firebase issues a session token.
   - Auth listener triggers the protected “list” view.

2. **CRUD Operations**
   - `addItem()` → Adds a new document to the `items` collection.  
   - `getItems()` → Subscribes to Firestore snapshots for real-time updates.  
   - `updateItem()` → Modifies an existing document by ID.  
   - `deleteItem()` → Removes a document by ID.

3. **Security Rules**
   ```js
   match /items/{itemId} {
     allow read, write: if request.auth != null;
   }
  ```

Only authenticated users can read or write.

---

## 🧰 Stack

| Layer    | Technology              | Purpose                         |
| -------- | ----------------------- | ------------------------------- |
| Frontend | HTML / JavaScript       | UI + App Logic                  |
| Auth     | Firebase Authentication | Secure Login & Session Handling |
| Database | Firestore               | Persistent List Storage         |
| Hosting  | Firebase Hosting        | Static Site Deployment          |
| Tooling  | Firebase CLI            | Build, Serve, Deploy            |

---

## ⚙️ Setup & Run

### 1️⃣ Prerequisites

* [Node.js](https://nodejs.org) ≥ 18
* [Firebase CLI](https://firebase.google.com/docs/cli)
* A Firebase project configured in [Firebase Console](https://console.firebase.google.com)

### 2️⃣ Local Setup

```bash
git clone https://github.com/yourusername/bobbin.git
cd bobbin
npm install -g firebase-tools
firebase login
firebase init
firebase serve
```

### 3️⃣ Deployment

```bash
firebase deploy
```

---

## 🔒 Authentication

This demo app is intentionally wrapped in Firebase Auth.
You’ll need valid credentials to log in — reach out directly if you’d like temporary access for testing.

---

## 🧩 Learning Goals

Bobbin was built as a personal learning sandbox to:

* Understand Firebase Auth and session handling.
* Practice Firestore’s real-time database model.
* Explore secure CRUD design patterns.
* Prototype a “Hello, World” architecture suitable for reuse.

---

## 🪡 Future Extensions

* Add OAuth sign-in (Google / GitHub).
* Implement serverless Cloud Functions for validation.
* Extend UX with React or Vue.
* Add role-based Firestore rules.

---

## 📄 License

MIT © 2025 Nick Cottrell

```
