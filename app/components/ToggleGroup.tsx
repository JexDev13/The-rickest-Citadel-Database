'use client';

interface ToggleGroupProps {
  value: 'az' | 'id';
  onChange: (value: 'az' | 'id') => void;
}

export default function ToggleGroup({ value, onChange }: ToggleGroupProps) {
  return (
    <div className="toggle-group">
      <span className="toggle-label">
        Ordenar por:
      </span>
      
      <div className="toggle-buttons">
        <button
          onClick={() => onChange('az')}
          className={`toggle-button ${value === 'az' ? 'active' : ''}`}
        >
          A-Z
        </button>
        <button
          onClick={() => onChange('id')}
          className={`toggle-button ${value === 'id' ? 'active' : ''}`}
        >
          ID #
        </button>
      </div>
    </div>
  );
}