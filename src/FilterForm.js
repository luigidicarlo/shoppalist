export const FilterForm = ({ filter, setFilter }) => {
  const onChange = ({ target }) => {
    setFilter(target.value);
  };

  const onClear = () => {
    setFilter('');
  };

  return (
    <div className="d-flex flex-column align-items-center mb-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar"
          onChange={onChange}
          value={filter}
        />
        <button
          type="button"
          className="btn btn-danger"
          disabled={!filter.length}
          title="Reiniciar Búsqueda"
          onClick={onClear}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};
