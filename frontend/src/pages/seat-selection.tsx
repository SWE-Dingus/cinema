import React from 'react';
import { useRouter } from 'next/router';

const SeatSelectionPage: React.FC = () => {
  const router = useRouter();
  const { movieId, title, showtime } = router.query;

  // Hard-coded seat map
  const seats = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4'];

  const handleSeatSelection = (seat: string) => {
    console.log(`Selected seat: ${seat}`);
    router.push(`/checkout?movieId=${movieId}&title=${encodeURIComponent(title as string)}&showtime=${showtime}&seat=${seat}`);
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#1b0c1a', // Updated background color
      padding: '2rem',
    },
    heading: {
      fontSize: '2.5rem',
      color: '#fadcd5', // Light color for better contrast
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    subheading: {
      fontSize: '1.5rem',
      color: '#fadcd5', // Consistent subheading color
      marginBottom: '2rem',
    },
    seatGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1rem',
      width: '100%',
      maxWidth: '600px',
    },
    seatButton: {
      padding: '0.75rem',
      fontSize: '1.2rem',
      color: '#1b0c1a', // Dark color for text
      background: '#fadcd5', // Updated button color
      border: 'none',
      borderRadius: '8px',
      textAlign: 'center' as const,
      cursor: 'pointer',
      transition: 'background-color 0.3s, transform 0.3s',
    },
    seatButtonHover: {
      backgroundColor: '#e0c2a0', // Slightly darker shade for hover
      transform: 'scale(1.05)', // Scale effect on hover
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Select a Seat for {title}</h1>
      <p style={styles.subheading}>Showtime: {showtime}</p>
      
      <div style={styles.seatGrid}>
        {seats.map((seat, index) => (
          <button
            key={index}
            onClick={() => handleSeatSelection(seat)}
            style={styles.seatButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = styles.seatButtonHover.backgroundColor;
              e.currentTarget.style.transform = styles.seatButtonHover.transform;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = styles.seatButton.background;
              e.currentTarget.style.transform = 'scale(1)'; // Reset scale
            }}
          >
            {seat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeatSelectionPage;