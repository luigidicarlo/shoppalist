export const Form = ({ onSubmit, formState, onChange, resetForm }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="form-inline d-flex flex-sm-row flex-column align-items-center justify-content-between"
    >
      <div className="form-group mb-3 me-1 w-100">
        <label className="text-secondary" htmlFor="name">
          Nombre
        </label>
        <input
          className="form-control"
          type="text"
          name="name"
          value={formState.name}
          onChange={onChange}
          placeholder="Nombre del artículo"
        />
      </div>
      <div className="form-group mb-3 me-1 w-100">
        <label className="text-secondary" htmlFor="quantity">
          Cantidad
        </label>
        <input
          type="number"
          min="0"
          max="99.999"
          step="0.001"
          name="quantity"
          className="form-control"
          value={formState.quantity}
          onChange={onChange}
          placeholder="99.99"
        />
      </div>
      <div className="form-group mb-3 me-1 w-100">
        <label className="text-secondary" htmlFor="Precio">
          Precio
        </label>
        <input
          type="number"
          min="0"
          max="999.999"
          step="0.001"
          name="price"
          className="form-control"
          value={formState.price}
          onChange={onChange}
          placeholder="999.999"
        />
      </div>
      <div className="d-flex align-items-center justify-content-center my-2">
        {formState.itemToEdit && (
          <button
            type="button"
            className="btn btn-danger me-3"
            onClick={resetForm}
          >
            Cancelar
          </button>
        )}
        <button className="btn btn-success" type="submit">
          {formState.itemToEdit ? 'Editar' : 'Agregar'}
        </button>
      </div>
    </form>
  );
};
