'use client';

interface ErrorDisplayProps {
  title?: string;
  message?: string;
}

export default function ErrorDisplay({ 
  title = '404 Error dimensional',
  message = 'Personaje no encontrado. Intenta con otro ID o Nombre'
}: ErrorDisplayProps) {
  return (
    <div style={{ 
      padding: '4rem 2rem', 
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px'
    }}>
      <h1 style={{ 
        color: 'var(--color-senary)', 
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        fontFamily: '"IBM Plex Sans", sans-serif'
      }}>
        {title}
      </h1>
      <p style={{ 
        color: 'var(--color-senary)',
        fontSize: '1.5rem',
        fontFamily: '"IBM Plex Sans", sans-serif'
      }}>
        {message}
      </p>
    </div>
  );
}
