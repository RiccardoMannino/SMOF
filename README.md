# 🏔️ SMOF - San Martino Outdoor Festival

Una piattaforma web moderna e completa per la gestione e promozione del **San Martino Outdoor Fest** - un festival di eventi outdoor, escursioni e attività naturalistiche organizzato in Sicilia.

---

## 📋 Indice

- [Scopo e Obiettivi](#-scopo-e-obiettivi)
- [Funzionalità Principali](#-funzionalità-principali)
- [Stack Tecnologico](#-stack-tecnologico)
- [Struttura del Progetto](#-struttura-del-progetto)
- [Setup e Installazione](#-setup-e-installazione)
- [Development](#-development)
- [Build e Deployment](#-build-e-deployment)
- [SEO e Indicizzazione](#-seo-e-indicizzazione)
- [Contenuti](#-contenuti)

---

## 🎯 Scopo e Obiettivi

SMOF è una piattaforma all-in-one che mira a:

- ✅ **Promuovere il festival** - Showcasing di eventi, attività e esperienze outdoor
- ✅ **Gestire i biglietti** - Sistema di prenotazione e acquisto di ticket (giornalieri, festival completo, custom)
- ✅ **Autenticazione utenti** - Login sicuro tramite Google OAuth per accedere ai servizi
- ✅ **Gestione ospitalità** - Elenco di strutture ricettive partner
- ✅ **Gallery fotografica** - Showcase fotografico degli eventi passati
- ✅ **Contact management** - Form di contatto con notifiche email
- ✅ **Pagamento online** - Integrazione Stripe per transazioni sicure (in progress)
- ✅ **Conformità legale** - Privacy Policy, Cookie Policy, Termini e Condizioni

---

## ⚡ Funzionalità Principali

### 1. **Sistema di Ticketing**

- 🎫 Biglietti giornalieri
- 🎪 Biglietto festival completo
- 🎯 Biglietti custom (scelta selettiva di eventi)
- 📊 Gestione inventario e disponibilità
- 🔒 Pagamenti sicuri via Stripe

### 2. **Autenticazione e Account**

- 🔐 Login con Google OAuth
- 👤 Profili utente
- 🔑 Sessioni sicure
- 📧 Email di verifica

### 3. **Content Management**

- 📄 Pagine dinamiche
- 🎤 Schede eventi con dettagli completi
- 🏨 Catalogo ospitalità
- 🖼️ Gallerie fotografiche

### 4. **Comunicazione**

- 📧 Form di contatto con EmailJS
- 💬 Notifiche email automatiche
- 📬 Newsletter (struttura pronta)

### 5. **Esperienza Utente**

- 📱 Responsive design (mobile-first)
- ♿ Accessibilità WCAG compliant
- 🎨 Tema personalizzato (colori chocolate, mustard, ivory)
- ⚡ Animazioni smooth con Motion

### 6. **SEO e Scopribilità**

- 🗺️ Sitemap dinamico (sitemap.xml)
- 🤖 Robots.txt ottimizzato
- 📊 Metadati completi (Open Graph, Twitter Card)
- 🖼️ Social preview con logo SMOF
- 📍 URL canonical su tutte le pagine
- ⏱️ Meta base URL configurato

---

## 🛠️ Stack Tecnologico

### **Frontend**

- **Next.js 16** - Framework React con SSR/SSG
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Hook Form** - Form management

### **CMS & Content**

- **Sanity.io** - Headless CMS con schema type-safe
- **next-sanity** - Integrazione Next.js + Sanity
- **Sanity Vision** - Query builder

### **Backend & API**

- **Next.js API Routes** - Serverless endpoints
- **Stripe** - Payment processing
- **EmailJS** - Email delivery
- **Supabase** - PostgreSQL
- **@auth/supabase-adapter** - Auth.js adapter

### **Autenticazione**

- **NextAuth.js 5** - Session management
- **Google OAuth** - Social login
- **Supabase Auth** - Database delle sessioni

### **State & Data Fetching**

- **TanStack React Query** - Data fetching e caching
- **Zustand** - State management
- **next-sanity live** - Real-time content updates

### **UI & UX**

- **Radix UI** - Unstyled component library
- **Lucide React** - Icon library
- **Tabler Icons** - Additional icons
- **motion** - Animation library
- **react-toastify** - Toast notifications
- **next-themes** - Theme switcher

### **Development Tools**

- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Turbopack** - Next.js bundler acceleration

---

## 📁 Struttura del Progetto

```
src/
├── app/                              # Next.js App Router
│   ├── (frontend)/                   # Public pages
│   │   ├── page.tsx                  # Home
│   │   ├── tickets/                  # Ticketing
│   │   ├── contatti/                 # Contact form
│   │   ├── eventi/[slug]/            # Event details
│   │   ├── ospitalita/[slug]/        # Hospitality listings
│   │   ├── galleria/                 # Photo galleries
│   │   ├── login/                    # Authentication
│   │   ├── privacy/                  # Legal pages
│   │   ├── cookie/
│   │   └── termini/
│   ├── api/                          # API routes
│   ├── studio/                       # Sanity Studio
│   ├── layout.tsx                    # Root layout
│   ├── robots.ts                     # SEO robots.txt
│   └── sitemap.ts                    # Dynamic sitemap
├── components/                       # React components
│   ├── ButtonMenu.tsx
│   ├── Cart.tsx
│   ├── Event.tsx
│   ├── EventCard.tsx
│   ├── PageBuilder.tsx
│   ├── TicketPurchaseButton.tsx
│   └── ui/                           # UI components
├── lib/                              # Utilities
│   ├── auth.ts                       # Auth config
│   ├── supabase.ts                   # Supabase client
│   ├── date.ts                       # Date utilities
│   ├── action.ts                     # Server actions
│   └── utils.ts
├── sanity/                           # CMS schema & queries
│   ├── lib/                          # Sanity utilities
│   ├── schema/                       # Type definitions
│   └── queries.ts                    # GROQ queries
└── store/                            # Zustand stores

public/
├── logo_smof.png                     # Brand logo
└── ...

config/
├── sanity.config.ts                  # Sanity configuration
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
└── tsconfig.json
```

---

## 🚀 Setup e Installazione

### **Prerequisiti**

- Node.js 18+
- npm o yarn
- Git

### **1. Clone il repository**

```bash
git clone <repository-url>
cd smof
```

### **2. Installa le dipendenze**

```bash
npm install
```

### **3. Configura le variabili d'ambiente**

Crea un file `.env.local`:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Auth.js
AUTH_SECRET=your_auth_secret
AUTH_GOOGLE_ID=your_google_oauth_id
AUTH_GOOGLE_SECRET=your_google_oauth_secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret

# EmailJS
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
```

### **4. Genera i type da Sanity**

```bash
npm run typegen
```

---

## 🔧 Development

### **Avvia il server di sviluppo**

```bash
npm run dev
```

Accedi a:

- 🌐 Sito: [http://localhost:3000](http://localhost:3000)
- 📝 Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

### **Lint il codice**

```bash
npm run lint
```

---

## 🏗️ Build e Deployment

### **Build per produzione**

```bash
npm run build
npm start
```

### **Deploy Sanity**

```bash
npm run sanity deploy
```

### **Deployment consigliati**

- **Frontend**: Vercel (integrazione Next.js nativa)
- **CMS**: Sanity Cloud
- **Database**: Supabase Cloud
- **Pagamenti**: Stripe
- **Email**: EmailJS

---

## 📊 SEO e Indicizzazione

Il sito è completamente ottimizzato per i motori di ricerca:

- ✅ **Sitemap dinamico** - `sitemap.xml` con tutte le pagine
- ✅ **Robots.txt** - Configurazione crawling ottimale
- ✅ **Metadati completi** - Title, description, keywords su ogni pagina
- ✅ **Open Graph** - Preview social media (Facebook, LinkedIn)
- ✅ **Twitter Card** - Tweet preview con immagine
- ✅ **Canonical URLs** - URL duplicate prevention
- ✅ **metadataBase** - URL base configurato (https://www.smofest.it)
- ✅ **generateMetadata** - Server-side metadata generation

---

## 📝 Contenuti

### **Pagine Statiche**

- Home
- Tickets
- Contatti
- Login
- Privacy Policy
- Cookie Policy
- Termini e Condizioni

### **Pagine Dinamiche (da Sanity)**

- Pagine custom
- Dettagli eventi
- Ospitalità
- Gallerie fotografiche

---

## 🔐 Sicurezza

- ✅ Variabili d'ambiente protette
- ✅ Autenticazione OAuth
- ✅ Pagamenti PCI-DSS via Stripe
- ✅ Rate limiting su API routes
- ✅ CORS configurato
- ✅ CSP headers

---

## Licenza

Questo progetto è privato e proprietario.
