'use client';

import { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  onSearch: (query: string, searchType: 'id' | 'name') => void;
  onReset?: () => void;
}

export default function SearchBar({ onSearch, onReset }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState<'id' | 'name'>('id');
  const hasSearched = useRef(false);

  useEffect(() => {
    if (searchValue === '' && hasSearched.current && onReset) {
      onReset();
      hasSearched.current = false;
    }
  }, [searchValue, onReset]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      hasSearched.current = true;
      onSearch(searchValue.trim(), searchType);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value as 'id' | 'name')}
        className="search-select"
      >
        <option value="id">ID</option>
        <option value="name">Nombre</option>
      </select>

      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={`Buscar por ${searchType === 'id' ? 'ID' : 'Nombre'}`}
        className="search-input"
      />

      <button
        type="submit"
        className="search-button"
        onMouseOver={(e) => {
          e.currentTarget.style.opacity = '0.85';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </button>
    </form>
  );
}
