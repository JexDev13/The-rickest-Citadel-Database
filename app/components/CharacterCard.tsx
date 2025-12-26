import Image from 'next/image';
import { Character } from '@/app/types/character';

interface CharacterCardProps {
  character: Character;
  onViewDetails: (character: Character) => void;
}

export default function CharacterCard({ character, onViewDetails }: CharacterCardProps) {
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
    <div
      style={{
        backgroundColor: 'var(--white)',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
        border: '1px solid transparent',
      }}
      onClick={() => onViewDetails(character)}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--primary-blue)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'transparent';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="character-image-container">
        <Image
          src={character.image}
          alt={character.name}
          fill
          style={{ objectFit: 'cover', borderRadius: '5%', border: '2px solid var(--accent-yellow)' }}
        />
      </div>
      <h1 style={{ margin: '0 0 1rem 0', fontSize: '25px', fontWeight: '400', textAlign: 'center' }}>
        {character.name}
      </h1>
      <div style={{ fontSize: '14px', color: 'var(--foreground)', opacity: 0.8, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <strong>Estado:</strong>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: getStatusColor(character.status),
              display: 'inline-block',
            }}
          />
          <span>{character.status}</span>
        </div>
        <p style={{ margin: '0.25rem 0' }}>
          <strong>Especie:</strong> {character.species}
        </p>
        <p style={{ margin: '0.25rem 0' }}>
          <strong>Género:</strong> {character.gender}
        </p>
      </div>
    </div>
  );
}
