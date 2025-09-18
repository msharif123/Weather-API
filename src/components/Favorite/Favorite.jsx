const Favorite = ({ favorites, myFavorite }) => {
    if (!favorites || favorites.length === 0) {
      return <p>No favorites yet.</p>;
    }
  
    return (
      <div>
        <h3>Favorites</h3>
        <ul>
          {favorites.map((city, index) => (
            <li key={index}>
              {city}
              <button onClick={() => myFavorite(city)}>
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Favorite;
  