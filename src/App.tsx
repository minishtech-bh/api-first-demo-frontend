import { useState } from 'react'
import AppPage from './pages/AppPage'
import AdminPartnerPage from './pages/AdminPartnerPage'
import AdminPlatformPage from './pages/AdminPlatformPage'

type Tab = 'app' | 'partner' | 'platform'

export default function App() {
  const [tab, setTab] = useState<Tab>('app')

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 960, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 20, marginBottom: 16 }}>Point Management Demo</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {(['app', 'partner', 'platform'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '6px 16px',
              background: tab === t ? '#1677ff' : '#f0f0f0',
              color: tab === t ? '#fff' : '#333',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            {t === 'app' ? 'App (B2C)' : t === 'partner' ? 'Admin — 제휴사' : 'Admin — 플랫폼'}
          </button>
        ))}
      </div>
      {tab === 'app' && <AppPage />}
      {tab === 'partner' && <AdminPartnerPage />}
      {tab === 'platform' && <AdminPlatformPage />}
    </div>
  )
}
