# Student Attendance Management

A modern, production-quality **Student Attendance Management** application built as a frontend screening task. It features a clean, handcrafted design system using Next.js 16, React 19, TypeScript, and Tailwind CSS — with a JSON Server-backed REST API.

---

## ✨ Features

- 📋 **Attendance Dashboard** — View all 15 students with their real-time attendance status
- 🔍 **Live Search** — Filter students by name (case-insensitive) in real-time
- 🎛️ **Class Filter** — Dropdown to filter by All Classes, Class 9, or Class 10
- ✏️ **Edit Attendance** — Modal dialog to update any student's status (Present / Absent / Leave)
- 🟢 **Status Badges** — Color-coded pill badges for each attendance state
- 📊 **Summary Cards** — Live counts for Total, Present, Absent, and On Leave
- 💀 **Skeleton Loaders** — 1-second simulated loading with fully shaped skeletons
- 🪹 **Empty State** — Friendly illustration when no results match with a Reset button
- 📱 **Fully Responsive** — Table on desktop, cards on mobile — no horizontal scrolling
- 🌐 **JSON Server API** — GET & PATCH via Axios with error state, retry, and offline fallback
- ♿ **Accessible** — Focus trap in modal, keyboard navigable, semantic HTML throughout

---

## 🗂 Folder Structure

```
softayan/
├── app/
│   ├── globals.css          # Global styles & modal animations
│   ├── layout.tsx           # Root layout with metadata & fonts
│   └── page.tsx             # Main dashboard (all page-level state & logic)
│
├── components/
│   └── attendance/
│       ├── AttendanceModal.tsx   # Edit modal with focus trap
│       ├── AttendanceSummary.tsx # Stats cards row
│       ├── ClassFilter.tsx       # Class dropdown filter
│       ├── EmptyState.tsx        # No-results view
│       ├── LoadingSkeleton.tsx   # Pulse skeleton loaders
│       ├── SearchBar.tsx         # Search input with clear button
│       ├── StatusBadge.tsx       # Colored pill badge
│       ├── StudentCard.tsx       # Mobile card view
│       └── StudentTable.tsx      # Desktop table view
│
├── data/
│   └── students.ts          # 15 seed students (offline fallback)
│
├── lib/
│   └── utils.ts             # cn(), formatDate(), computeStats(), STATUS_CONFIG
│
├── services/
│   └── studentService.ts    # Axios GET /students + PATCH /students/:id
│
├── types/
│   └── student.ts           # TypeScript interfaces & union types
│
├── db.json                  # JSON Server database
├── .env.local               # NEXT_PUBLIC_API_URL=http://localhost:4000
└── package.json
```

---

## 🚀 Installation & Getting Started

### 1. Clone / navigate to the project

```bash
cd softayan
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the Next.js development server

```bash
npm run dev
```

The app will be live at **http://localhost:3000**

### 4. (Optional) Start the JSON Server API

Open a **second terminal** and run:

```bash
npm run api
```

The REST API will be available at **http://localhost:4000/students**

> **Note:** If JSON Server is not running, the app automatically falls back to local demo data with a "Load Local Demo Data" button shown on the error screen.

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | App Router, SSR/Client components |
| **React 19** | UI rendering, hooks |
| **TypeScript** | Full type safety, interfaces everywhere |
| **Tailwind CSS v4** | Utility-first styling |
| **Axios** | HTTP client for JSON Server API |
| **JSON Server** | Lightweight mock REST API |
| **Lucide React** | Icon library |
| **clsx + tailwind-merge** | Conditional className merging |

---

## 🔌 API Endpoints (JSON Server)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/students` | Fetch all students |
| `PATCH` | `/students/:id` | Update student attendance status |

---

## 🔮 Future Improvements

- [ ] **Authentication** — Role-based login (Teacher / Admin) with NextAuth.js
- [ ] **Date-based Attendance** — Track records per day with a date picker
- [ ] **Export to CSV/PDF** — Download monthly attendance reports
- [ ] **Bulk Actions** — Mark entire class as Present/Absent in one click
- [ ] **Analytics Page** — Charts showing weekly/monthly trends per student
- [ ] **Dark Mode** — Full dark theme toggle with `next-themes`
- [ ] **Optimistic UI** — Already partially implemented; extend to all mutations
- [ ] **Server Actions** — Replace Axios with Next.js 16 Server Actions + React 19 `useActionState`
- [ ] **Database** — Swap JSON Server with PostgreSQL via Prisma + `@vercel/postgres`

---

## 📝 Notes

- All data is persisted in `db.json` when the JSON Server is running.
- Without the API server, changes are made to local React state only (resets on refresh).
- The app uses **optimistic UI updates** — the table reflects changes instantly while the PATCH request is in-flight, and rolls back automatically on failure.
