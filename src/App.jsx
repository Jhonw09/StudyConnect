import { useState } from "react";
import Card3D from "./Card3D";
import Animation3D from "./Animation3D";
import FloatingElements from "./FloatingElements";

export default function App() {
  const [currentView, setCurrentView] = useState('floating');

  const renderContent = () => {
    switch(currentView) {
      case 'card': return <Card3D />;
      case 'animation': return <Animation3D />;
      case 'floating': return <FloatingElements />;
      default: return <FloatingElements />;
    }
  };

  return (
    <div>
      {/* Botões de navegação */}
      <div style={{
        position: 'fixed',
        top: 20,
        left: 20,
        zIndex: 1000,
        display: 'flex',
        gap: 10,
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setCurrentView('floating')}
          style={{
            padding: '10px 20px',
            borderRadius: 25,
            border: 'none',
            background: currentView === 'floating' ? '#667eea' : 'rgba(255,255,255,0.2)',
            color: 'white',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            fontSize: '14px'
          }}
        >
          Elementos Flutuantes
        </button>
        <button
          onClick={() => setCurrentView('card')}
          style={{
            padding: '10px 20px',
            borderRadius: 25,
            border: 'none',
            background: currentView === 'card' ? '#667eea' : 'rgba(255,255,255,0.2)',
            color: 'white',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            fontSize: '14px'
          }}
        >
          Card 3D
        </button>
        <button
          onClick={() => setCurrentView('animation')}
          style={{
            padding: '10px 20px',
            borderRadius: 25,
            border: 'none',
            background: currentView === 'animation' ? '#667eea' : 'rgba(255,255,255,0.2)',
            color: 'white',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            fontSize: '14px'
          }}
        >
          Cubo 3D
        </button>
      </div>

      {/* Conteúdo */}
      {renderContent()}
    </div>
  );
}
