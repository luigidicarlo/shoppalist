import { Popover } from "@headlessui/react";
import swal from "sweetalert";
import { useProductsContext } from "../../hooks/useItemsContext";
import { useModals } from "../../hooks/useModals";

interface IProps {}

export const HeaderPopover: React.FC<IProps> = ({}) => {
  const { products: items, setProducts: setItems } = useProductsContext();
  const { openUploadModal, openCategoriesModal } = useModals();

  const clearList = () => {
    swal({
      title: "Limpiar lista",
      text: "¿Deseas limpiar la lista actual? Perderás todos los productos registrados.",
      buttons: ["Cancelar", "Limpiar"],
      dangerMode: true,
    }).then((confirmed) => {
      if (!confirmed) {
        return;
      }
      setItems([]);
    });
  };

  const exportList = () => {
    const rawItems = localStorage.getItem("items");

    if (!rawItems) {
      return swal({
        title: "No hay datos para descargar",
        text: "Asegúrate de añadir productos a la lista antes de exportarla.",
      });
    }

    const itemsAsObject = JSON.parse(rawItems);

    if (!itemsAsObject || itemsAsObject.length <= 0) {
      return swal({
        title: "No hay datos para descargar",
        text: "Asegúrate de añadir productos a la lista antes de exportarla.",
      });
    }

    const generatedUrl = `data:text/json;charset=utf-8,${encodeURIComponent(
      rawItems,
    )}`;
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const anchorElement = document.createElement("a");
    anchorElement.setAttribute("href", generatedUrl);
    anchorElement.setAttribute(
      "download",
      `shoppalist-${day}-${month}-${year}.json`,
    );
    anchorElement.classList.add("hidden");
    document.body.append(anchorElement);
    anchorElement.click();
    anchorElement.remove();
  };

  return (
    <Popover className="relative">
      <Popover.Button
        title="Menú"
        className="px-4 flex items-center justify-end focus:outline-none"
      >
        <i className="fas fa-ellipsis-v"></i>
      </Popover.Button>

      <Popover.Panel className="absolute top-6 right-0 z-10 bg-white p-2 shadow-lg flex flex-col items-start justify-center gap-2 w-screen">
        {items.length > 0 && (
          <button
            className="text-red-600 mx-2 p-1 text-2xl flex items-center gap-2"
            style={{ textDecoration: "none" }}
            title="Limpiar lista"
            onClick={clearList}
          >
            <i className="fas fa-times"></i>{" "}
            <span className="text-base">Borrar Lista</span>
          </button>
        )}
        <button
          className="text-gray-700 mx-2 p-1 flex items-center gap-2"
          style={{ textDecoration: "none" }}
          title="Exportar lista"
          onClick={exportList}
        >
          <i className="fas fa-download"></i>
          <span className="text-base">Descargar Lista</span>
        </button>
        <button
          className="text-gray-700 mx-2 p-1 flex items-center gap-2"
          style={{ textDecoration: "none" }}
          title="Importar lista"
          onClick={openUploadModal}
        >
          <i className="fas fa-upload"></i>
          <span className="text-base">Cargar Lista</span>
        </button>
        <button
          className="text-gray-700 mx-2 p-1 flex items-center gap-2"
          onClick={openCategoriesModal}
        >
          <i className="fas fa-bars" />
          <span className="text-base">Categorías</span>
        </button>
      </Popover.Panel>
    </Popover>
  );
};
