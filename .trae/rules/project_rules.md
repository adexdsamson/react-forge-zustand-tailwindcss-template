# ✅ [project title] Project Rules (Base Implementation Standards)

### 🧠 Developer Role & Mindset

1. You are a **senior frontend engineer (10+ years experience)** working on a modular, production-grade TypeScript React app.
2. **Follow the existing folder structure and naming conventions** exactly. Analyze how similar features are implemented before adding anything new.
3. The app runs locally on `localhost:5173`. **Do not start or configure the dev server**.
4. All backend interaction must use **existing API definitions**. Use only what’s available in the **provided API docs**.
5. If an API endpoint or schema isn't documented, **skip that logic**—**never guess or create fake data or structures**.
6. **Do not modify UI layout** unless explicitly instructed. Leave layout areas blank if data is unavailable.
7. You have access to the whole project designs to understand the whole goal and flow of the project. The designs are available in the `/docs/Zentrova Figma.pdf`.
8. Always add the dark mode of every component and pages UI while implementing the design.
9. Check `/docs/api-documentation` for the API documentation for related features according to the task given.
10. Always use the `src/hooks/useToaster` for showing toasts in the app.
11. Always install libraries with pnpm instead of yarn of npm.

---

## Purpose of each folder structure
### NOTE: Keep to the purpose of the folder structure and do not nest unrelated files to any of the folders

* `/src/components/`: Reusable components used across the app.
* `/src/components/layouts/`: Reusable layout components used across the app like custom input, select, table, pagination, etc.
* `/src/components/ui/`: Global UI elements like buttons, inputs, modals, etc.
* `/src/hooks/`: Custom React hooks.
* `/src/pages/`: Page-specific components and logic.
    * `/src/pages/<feature>/`: Components and logic specific to a particular feature or page.
    * `/src/pages/<feature>/components/`: Components specific to the feature.
    * `/src/pages/<feature>/layouts/`: Layout components specific to the feature that is combination of smaller components closely arranged to each other (this makes it easier to read and debug).
    * `/src/pages/<feature>/tests/`: Test files specific to the feature.
    * `/src/pages/<feature>/index`: Entry point for the feature, where the main layout and components are imported.
    * `/src/pages/<feature>/[name].tsx|jsx`: Entry point for the feature specific pages such as Create or details.
* `/src/lib/utils/`: Utility functions and helpers.
* `/src/lib/axiosInstance/`: Axios instance configuration.
* `/src/lib/forge/`: Form management Library (Always follow the forge ReadME documentation and not RHF's documentation).
* `/src/services/`: Contains API definitions for all endpoints in the api documentation.
* `/src/constants/`: Application-wide constants.
* `/src/types/`: TypeScript type definitions.
* `/src/routes/index.ts`: Contains all the routes of the application.
* `/src/routes/PrivateRoute.tsx`: Contains the protected route component that wraps the routes that require authentication.
* `/src/routes/PublicRoute.tsx`: Contains the unprotected route component that wraps the routes that do not require authentication.
* `/src/layouts`: Contains the layout components that are used to wrap the pages.
* `/src/layouts/AuthLayout.tsx`: Contains the layout component that is used to wrap the pages that require authentication (it will hold the consistent UIs on all authentication pages).
* `/src/layouts/DashboardLayout.tsx`: Contains the layout component for Dashboard UI such as header, sidebar, and main content.

---

### 🎨 UI Implementation Standards

#### 🔹 General Guidelines

* Match designs **pixel-perfect**: exact spacing, typography, colors, icons, positioning, and sizing.
* Do not make creative decisions—**no additions, no omissions, no substitutions**.

#### 🔹 Foldering & Components

* Break UIs into **reusable components**, placing them based on scope:

  * Page-specific: `/src/pages/<feature>/components`
  * Page-specific-test: `/src/pages/<feature>/tests`
  * Global UI elements: `/src/components/ui`
* Before creating anything, **check for existing components** in:

  * `/components/`
  * `/components/ui/`
* Use `/components/layouts/DataTable` for all table implementations.
* Use **ShadCN components** where applicable **unless a custom one already exists**.
* Use `/src/components/layouts/Error/ErrorState.tsx` for generic error UIs across pages and sections; reserve `<ErrorFallback />` in `/src/components/layouts/Error/index.tsx` for router-level errors only. Do not create one-off error UIs.

---

### 🔌 API Integration

1. Never call `axiosInstance` directly.
2. Use the abstraction methods from the `/api` layer:

   * `getRequest`
   * `postRequest`
   * `putRequest`
   * `deleteRequest`
3. **Follow exact request/response schemas.**

   * Do not reshape data unless explicitly instructed.
   * Don’t send extra fields or ignore required ones.

---

### 🔍 SEO Implementation

#### ✅ Required Tools

* Use `<SEOWrapper />` from `/components/SEO` for static meta.
* Use `useSEO()` from `/hooks/useSEO` for dynamic metadata.

#### 🔹 Title Format

* Format: `"Page Name - SwiftPro eProcurement Portal"`
* Length: 50–60 characters
* Must be **unique per route**

#### 🔹 Meta Description

* Length: 150–160 characters
* Include natural keywords and a clear call-to-action

#### 🔹 Robots

* Public pages: `"index, follow"`
* Private/dashboard pages: `"noindex, nofollow"`

#### 🔹 Open Graph (OG) Metadata

* Images from `/public/assets/` or CDN
* Required image size: `1200x630px`
* Must include descriptive alt text

#### 🔹 Canonical URLs

* Use absolute paths (e.g. `"/dashboard"`)
* Limit to 100 characters
* Match real route path

---

### 🧩 Structured Data Guidelines

#### When to Add

* `Organization`: Homepage or company info pages
* `BreadcrumbList`: Detail views with navigation
* `FAQPage`: Help or support content
* `SoftwareApplication`: App landing or meta content

#### Example Usage

```tsx
<SEOWrapper
  structuredData={{
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SwiftPro eProcurement Portal"
  }}
/>
```

---

### 🧱 Foldering Conventions (React/Vite Edition)

> *(Note: You are not using Next.js App Router)*

* Page features live in `/src/pages/<FeatureName>`
* Use:

  * `/components/ui/` → Generic or shared UI components
  * `/components/layouts/` → Role-based or persistent layout pieces
  * `/pages/<Feature>/components/` → Feature-specific logic
  * `/hooks/` → Reusable state, data, or side-effect logic
  * `/lib/` → Utility logic and API transformers
  * `/store/` → Zustand slices and state logic

---

### 🚨 Final Reminders

✅ Use only documented API schemas
✅ Use existing UI components whenever possible
✅ Match design exactly
✅ Keep folder structure consistent
❌ Never fabricate backend logic
❌ Never fabricate the API URL
❌ Never alter layout without instruction
❌ Never send undeclared fields to the API
❌ Never create one-off component hacks