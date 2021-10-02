import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

export const Item = ({ item, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleInfo = () => {
    setIsOpen(!isOpen);
  };

  const onEditItem = () => {
    window.scrollTo(0, 0);
    onEdit(item);
  };

  const onDeleteItem = () => {
    onDelete(item.id);
  };

  return (
    <li className="list-group-item">
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="my-0 h5">{item.name}</h3>
        <button
          className="btn btn-sm btn-primary"
          onClick={onToggleInfo}
          title={`${isOpen ? 'Ocultar' : 'Mostrar'} detalles de ${item.name}`}
        >
          <i
            className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}
          ></i>
        </button>
      </div>
      {isOpen && (
        <Fragment>
          <hr />
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column">
              <p className="my-0 fw-bold">{Number(item.price).toFixed(3)}</p>
              <p className="text-secondary my-0">
                <small>Precio</small>
              </p>
            </div>
            <div className="d-flex flex-column align-items-center">
              <p className="my-0 fw-bold">{Number(item.quantity).toFixed(3)}</p>
              <p className="text-secondary my-0">
                <small>Cantidad</small>
              </p>
            </div>
            <div className="d-flex flex-column align-items-end">
              <p className="my-0 fw-bold">
                {(Number(item.price) * Number(item.quantity)).toFixed(3)}
              </p>
              <p className="text-secondary my-0">
                <small>Subtotal</small>
              </p>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-center my-3">
            <div>
              <button
                type="button"
                className="btn btn-primary pe-3 me-3"
                onClick={onEditItem}
              >
                <i className="fas fa-edit me-1"></i>
                <span>Editar</span>
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onDeleteItem}
              >
                <i className="fas fa-trash me-1"></i>
                <span>Eliminar</span>
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </li>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
