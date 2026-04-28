import '../feedcard.css'
const FeedCard = ({ product }) => {
  const { name, price, provider, location, badges } = product;

  return (
    <div className="card-container">
      <div className="card-header">
        <h3>{name}</h3>
        <span className="price-tag">${price}</span>
      </div>
      
      <div className="card-body">
        <p className="provider-info">
          <strong>Proveedor:</strong> {provider}
        </p>
        <p className="location">
          <i className="icon-map"></i> {location}
        </p>
      </div>

      <div className="card-footer">
        {badges.map((badge, index) => (
          <span key={index} className="badge">
            {badge}
          </span>
        ))}
        <button className="btn-direct-contact">
          Contactar Sin Intermediarios
        </button>
      </div>
    </div>
  );
};

export default FeedCard;