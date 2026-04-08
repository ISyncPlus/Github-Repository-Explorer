import { Navigate, Route, Routes } from 'react-router'
import { ExplorerPage } from './pages/ExplorerPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ExplorerPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}