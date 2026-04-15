import { useAppPointsApiGetMyBalance } from '../api/app'

export default function AppPage() {
  const { data, isLoading, isError } = useAppPointsApiGetMyBalance()

  if (isLoading) return <p>로딩 중...</p>
  if (isError) return <p style={{ color: 'red' }}>오류가 발생했습니다. (백엔드 미구현)</p>

  return (
    <div>
      <h2 style={{ fontSize: 16, marginBottom: 12 }}>내 포인트</h2>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <th style={thStyle}>잔액</th>
            <td style={tdStyle}>{data?.balance?.toLocaleString()} P</td>
          </tr>
          <tr>
            <th style={thStyle}>지갑 상태</th>
            <td style={tdStyle}>{data?.walletStatus ?? '-'}</td>
          </tr>
          <tr>
            <th style={thStyle}>만료일</th>
            <td style={tdStyle}>{data?.expiresAt ? new Date(data.expiresAt).toLocaleDateString() : '-'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const tableStyle: React.CSSProperties = { borderCollapse: 'collapse', width: 400 }
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '8px 12px', background: '#f5f5f5', border: '1px solid #ddd', width: 120 }
const tdStyle: React.CSSProperties = { padding: '8px 12px', border: '1px solid #ddd' }
