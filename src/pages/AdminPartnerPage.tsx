import { useState } from 'react'
import { useAdminPartnerPointsApiList } from '../api/admin-partner'

export default function AdminPartnerPage() {
  const [page, setPage] = useState(0)
  const { data, isLoading, isError } = useAdminPartnerPointsApiList({ page, size: 10 })

  if (isLoading) return <p>로딩 중...</p>
  if (isError) return <p style={{ color: 'red' }}>오류가 발생했습니다. (백엔드 미구현)</p>

  const rows = data?.content ?? []

  return (
    <div>
      <h2 style={{ fontSize: 16, marginBottom: 12 }}>임직원 포인트 목록 (제휴사)</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            {['ID', '이름', '직급', '잔액', '상태', '만료일'].map((h) => (
              <th key={h} style={thStyle}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={6} style={{ ...tdStyle, textAlign: 'center' }}>데이터 없음</td></tr>
          ) : (
            rows.map((r) => (
              <tr key={r.employeeInfoId}>
                <td style={tdStyle}>{r.employeeInfoId}</td>
                <td style={tdStyle}>{r.employeeName}</td>
                <td style={tdStyle}>{r.positionName ?? '-'}</td>
                <td style={tdStyle}>{r.balance.toLocaleString()} P</td>
                <td style={tdStyle}>{r.status}</td>
                <td style={tdStyle}>{r.expiresAt ? new Date(r.expiresAt).toLocaleDateString() : '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
        <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} style={btnStyle}>이전</button>
        <span>{page + 1} / {data?.totalPages ?? 1}</span>
        <button onClick={() => setPage((p) => p + 1)} disabled={page + 1 >= (data?.totalPages ?? 1)} style={btnStyle}>다음</button>
      </div>
    </div>
  )
}

const tableStyle: React.CSSProperties = { borderCollapse: 'collapse', width: '100%' }
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '8px 12px', background: '#f5f5f5', border: '1px solid #ddd' }
const tdStyle: React.CSSProperties = { padding: '8px 12px', border: '1px solid #ddd' }
const btnStyle: React.CSSProperties = { padding: '4px 12px', cursor: 'pointer' }
