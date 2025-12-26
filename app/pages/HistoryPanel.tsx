'use client';

import { Character } from '@/app/types/character';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HistoryPanelProps {
  history: Character[];
  onSelectCharacter: (character: Character) => void;
}

export default function HistoryPanel({ history, onSelectCharacter }: HistoryPanelProps) {
  const router = useRouter();

  const handleClick = (character: Character) => {
    onSelectCharacter(character);
    router.push(`/character/${character.id}`);
  };

  return (
    <div className="history-panel">
      
      <div className="history-header">
        <h2 style={{ 
          margin: 0, 
          fontSize: '1.2rem', 
          color: 'var(--text-main)',
          fontWeight: '700',
          letterSpacing: '-0.02em'
        }}>
          VISTOS RECIENTEMENTE
        </h2>
        <p style={{ 
          fontSize: '0.75rem', 
          color: 'var(--primary-blue)', 
          fontWeight: 'bold', 
          margin: '0.5rem 0 0 0',
          textTransform: 'uppercase'
        }}>
          Recién vistos en la curva
        </p>
      </div>
      
      {history.length === 0 ? (
        <div style={{ padding: '2rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '14px' }}>
            No hay registros recientes...
          </p>
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {history.map((character, index) => (
            <div
              key={`${character.id}-${index}`}
              onClick={() => handleClick(character)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                padding: '0.75rem',
                borderRadius: '12px',
                backgroundColor: 'var(--white)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease',
                border: '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-blue)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '65px',
                  height: '65px',
                  flexShrink: 0,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid var(--accent-yellow)',
                }}
              >
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="50px"
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--text-main)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {character.name}
                </h4>
                <p
                  style={{
                    margin: '0.1rem 0 0 0',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    fontWeight: '500'
                  }}
                >
                  {character.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}