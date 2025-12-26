'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import CharacterCard from '@/app/components/CharacterCard';
import SearchBar from '@/app/components/SearchBar';
import ToggleGroup from '@/app/components/ToggleGroup';
import ErrorDisplay from '@/app/components/ErrorDisplay';
import { Character } from '@/app/types/character';

interface MainContentProps {
    initialCharacters: Character[];
    onAddToHistory: (character: Character) => void;
    showError: boolean;
    onShowError: (show: boolean) => void;
}

export default function MainContent({ initialCharacters, onAddToHistory, showError, onShowError }: MainContentProps) {
    const router = useRouter();
    const safeInitialCharacters = useMemo(() => initialCharacters || [], [initialCharacters]);
    const [characters, setCharacters] = useState<Character[]>(safeInitialCharacters);
    const [displayedCharacters, setDisplayedCharacters] = useState<Character[]>(
        safeInitialCharacters.slice(0, 12)
    );
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [sortType, setSortType] = useState<'az' | 'id'>('id');
    const [, setIsFiltered] = useState(false);

    const sortCharacters = useCallback((chars: Character[], type: 'az' | 'id') => {
        const sorted = [...chars];
        if (type === 'az') {
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            return sorted.sort((a, b) => a.id - b.id);
        }
    }, []);

    const handleSortChange = useCallback((newSortType: 'az' | 'id') => {
        setSortType(newSortType);
        setIsFiltered(true);
        const sortedCharacters = sortCharacters(characters, newSortType);
        setCharacters(sortedCharacters);
        setDisplayedCharacters(sortedCharacters.slice(0, displayedCharacters.length));
    }, [characters, displayedCharacters.length, sortCharacters]);

    const handleLoadMore = async () => {
        setLoading(true);
        try {
            const nextPage = page + 1;
            const response = await fetch(`/api/characters?page=${nextPage}`);
            const data = await response.json();

            const existingIds = new Set(characters.map(c => c.id));
            const uniqueNewCharacters = data.results.filter((char: Character) => !existingIds.has(char.id));
            
            const newCharacters = [...characters, ...uniqueNewCharacters];
            setCharacters(newCharacters);
            setDisplayedCharacters(newCharacters.slice(0, displayedCharacters.length + 12));
            setPage(nextPage);
        } catch (error) {
            console.error('Error loading more characters:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (query: string, searchType: 'id' | 'name') => {
        setLoading(true);
        onShowError(false);
        setIsFiltered(true);
        try {
            if (searchType === 'id') {
                const response = await fetch(`/api/characters/${query}`);
                if (response.ok) {
                    const character = await response.json();
                    onAddToHistory(character);
                    router.push(`/character/${query}`);
                } else {
                    onShowError(true);
                }
            } else {
                const response = await fetch(`/api/characters?name=${encodeURIComponent(query)}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.results && data.results.length > 0) {
                        setDisplayedCharacters(data.results.slice(0, 12));
                        setCharacters(data.results);
                    } else {
                        onShowError(true);
                    }
                } else {
                    onShowError(true);
                }
            }
        } catch (error) {
            console.error('Error searching character:', error);
            onShowError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (character: Character) => {
        onAddToHistory(character);
        router.push(`/character/${character.id}`);
    };

    const handleReset = useCallback(() => {
        setDisplayedCharacters(safeInitialCharacters.slice(0, 12));
        setCharacters(safeInitialCharacters);
        setPage(1);
        onShowError(false);
        setIsFiltered(false);
        setSortType('id');
    }, [safeInitialCharacters, onShowError]);

    return (
        <div className="main-content-inner">
            <SearchBar onSearch={handleSearch} onReset={handleReset} />
            
            <ToggleGroup 
                value={sortType}
                onChange={handleSortChange}
            />

            {showError ? (
                <ErrorDisplay />
            ) : (
                <>
                    <div className="characters-grid">
                        {displayedCharacters.map((character) => (
                            <CharacterCard
                                key={character.id}
                                character={character}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>

                    {displayedCharacters.length < characters.length || page < 3 ? (
                        <div style={{ textAlign: 'center' }}>
                            <button
                                onClick={handleLoadMore}
                                disabled={loading}
                                style={{
                                    padding: '0.75rem 2rem',
                                    backgroundColor: loading ? 'var(--color-quinary)' : 'var(--color-secondary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    fontFamily: '"IBM Plex Sans", sans-serif',
                                }}
                            >
                                {loading ? 'Cargando...' : 'Cargar más'}
                            </button>
                        </div>
                    ) : null}
                </>
            )}
        </div>
    );
}
