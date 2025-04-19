import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
/**
 * src/
├── assets/                # Static files (images, fonts, etc.)
├── components/            # Reusable presentational UI components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── Button.module.css
│   ├── Card/
│   └── ...
├── containers/            # Smart components (pages or logic-heavy components)
│   ├── Home/
│   │   ├── Home.tsx
│   │   └── Home.module.css
│   ├── Dashboard/
│   └── ...
├── hooks/                 # Custom React hooks
├── services/              # API and service logic
├── store/                 # Global state management (Redux/Zustand/etc.)
├── types/                 # TypeScript types and interfaces
├── utils/                 # Utility/helper functions
├── contexts/              # React Contexts for shared state
├── App.tsx                # Main App component
├── index.tsx              # ReactDOM entry
└── routes.tsx             # Routing config (if using React Router)

 */
