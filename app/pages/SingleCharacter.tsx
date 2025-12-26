'use client';

import { useState, useEffect } from 'react';
import { Character } from '@/app/types/character';
import Image from 'next/image';
import { generateCharacterSummary } from '@/lib/geminiService';

interface SingleCharacterProps {
  character: Character;
}

export default function SingleCharacter({ character }: SingleCharacterProps) {
  const [summary, setSummary] = useState<string>('');
  const [loadingSummary, setLoadingSummary] = useState<boolean>(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoadingSummary(true);
      const generatedSummary = await generateCharacterSummary(character);
      setSummary(generatedSummary);
      setLoadingSummary(false);
    };
    
    fetchSummary();
  }, [character]);

  const handleRegenerateSummary = async () => {
    setLoadingSummary(true);
    const generatedSummary = await generateCharacterSummary(character);
    setSummary(generatedSummary);
    setLoadingSummary(false);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Alive':
        return 'var(--color-quaternary)';
      case 'Dead':
        return 'var(--color-senary)';
      case 'unknown':
        return 'var(--color-seventary)';
      default:
        return 'var(--color-seventary)';
    }
  };
  
  return (
    <div className="single-character-container">
      <div className="single-character-grid">
        <div>
          <div className="character-detail-image">
            <Image
              src={character.image}
              alt={character.name}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>

          <h1 className="character-detail-name">
            {character.name}
          </h1>
          <div className="character-detail-badge">
            Dimensión de Origen: {character.origin.name}
          </div>

          <div className="character-info-grid">
            <InfoItem label="Status" value={character.status} color={getStatusColor(character.status)} />
            <InfoItem label="Especie" value={character.species} color="var(--primary-blue)" />
            <InfoItem label="Género" value={character.gender} color="var(--primary-blue)" />
            <InfoItem label="Episodios" value={`${character.episode.length} apariciones`} color="var(--primary-blue)" />
            
            <div style={{ gridColumn: '1 / -1', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
              <InfoItem label="Última Ubicación" value={character.location.name} color={'var(--accent-yellow)'} />
            </div>
          </div>
        </div>

        <div className="character-sections">
          
          <section>
            <h2 style={{
              fontSize: '1.2rem',
              fontWeight: '800',
              color: 'var(--text-main)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ width: '8px', height: '24px', backgroundColor: 'var(--accent-yellow)', borderRadius: '4px' }} />
              RESUMEN DEL PERSONAJE
            </h2>
            <div style={{ position: 'relative' }}>
              <div style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: '#475569',
                backgroundColor: 'var(--white)',
                padding: '2rem',
                borderRadius: '20px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                minHeight: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {loadingSummary ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: 'var(--primary-blue)'
                  }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '3px solid var(--primary-blue)',
                      borderTop: '3px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    <span>Generando resumen con Rick AI...</span>
                  </div>
                ) : (
                  <p style={{ margin: 0, whiteSpace: 'pre-line' }}>
                    {summary}
                  </p>
                )}
              </div>
              
              {!loadingSummary && (
                <button
                  onClick={handleRegenerateSummary}
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    border: '1px solid var(--primary-blue)',
                    backgroundColor: 'var(--white)',
                    color: 'var(--primary-blue)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--primary-blue)';
                    e.currentTarget.style.color = 'var(--white)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--white)';
                    e.currentTarget.style.color = 'var(--primary-blue)';
                  }}
                  title="Regenerar resumen"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                  </svg>
                </button>
              )}
            </div>
          </section>

          <section>
            <h2 style={{
              fontSize: '1.2rem',
              fontWeight: '800',
              color: 'var(--text-main)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ width: '8px', height: '24px', backgroundColor: 'var(--primary-blue)', borderRadius: '4px' }} />
              APARICIONES EN EPISODIOS
            </h2>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              backgroundColor: 'var(--white)',
              padding: '1.5rem',
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
            }}>
              {character.episode.map((ep, index) => {
                const episodeId = ep.split('/').pop();
                return (
                  <div key={index} style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #50BFE644',
                    color: 'var(--text-main)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                  }}>
                    <span style={{ color: 'var(--primary-blue)' }}>#</span>
                    EP-{episodeId}
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h2 style={{
              fontSize: '1.2rem',
              fontWeight: '800',
              color: 'var(--text-main)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ width: '8px', height: '24px', backgroundColor: 'var(--primary-blue)', borderRadius: '4px' }} />
              JSON CRUDO
            </h2>
            <div style={{
              position: 'relative',
              backgroundColor: '#1E293B',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '2px solid #50BFE633'
            }}>
              <pre style={{
                margin: 0,
                color: 'var(--primary-blue)',
                fontSize: '13px',
                fontFamily: 'var(--font-geist-mono)',
                overflow: 'auto',
                maxHeight: '300px',
                lineHeight: '1.6'
              }}>
                {JSON.stringify(character, null, 2)}
              </pre>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span style={{ 
        fontSize: '11px', 
        fontWeight: '800', 
        color: '#94A3B8', 
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        {label}
      </span>
      <span style={{ 
        fontSize: '15px', 
        fontWeight: '600', 
        color: '#1E293B'
      }}>
        {value}
      </span>
      <div style={{ width: '20px', height: '2px', backgroundColor: color, marginTop: '4px' }} />
    </div>
  );
}