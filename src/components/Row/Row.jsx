import "./Row.scss";

const Row = ({ category, value }) =>
  category && value ? (
    <div className="row">
      <div className="category-cell">{category}</div>
      <div className="value-cell">{value}</div>
    </div>
  ) : null;

export default Row;
