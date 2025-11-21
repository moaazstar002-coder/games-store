import './GenreFilter.css';

export default function GenreFilter({ value, onChange, genres, loading }) {
  if (loading)
    return (
      <div className="genre-filter">
        <div className="genre-buttons loading">
          <button className="genre-btn" disabled>
            Loading...
          </button>
        </div>
      </div>
    );

  return (
    <div className="genre-filter">
      <div className="genre-buttons" role="tablist" aria-label="Genres">
        <button
          type="button"
          className={`genre-btn ${value === '' ? 'active' : ''}`}
          onClick={() => onChange('')}
          aria-pressed={value === ''}
        >
          All
        </button>

        {genres.map((g) => (
          <button
            key={g.id}
            type="button"
            className={`genre-btn ${value === g.slug ? 'active' : ''}`}
            onClick={() => onChange(g.slug)}
            aria-pressed={value === g.slug}
          >
            {g.name}
          </button>
        ))}
      </div>
    </div>
  );
}