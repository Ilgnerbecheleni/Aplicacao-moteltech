'use client';

import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <i className="icon icon-bed"></i>
        <span className="logo-text">Moteltech</span>
      </div>
      <nav className="sidebar__navigation">
        <div 
          className="item"
          onClick={() => router.push('/')}
          style={{ cursor: 'pointer' }}
        >
          <FiArrowLeft size={20} style={{ marginRight: '8px' }} />
          <span className="item-label">Voltar</span>
        </div>
      </nav>
    </aside>
  );
}
