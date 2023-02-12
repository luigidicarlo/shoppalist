import swal from 'sweetalert';
import { buttonPrimaryStyles } from '../constants/styles';
import { IItem } from '../interfaces';

interface IProps {
	items: IItem[];
	setItems: React.Dispatch<React.SetStateAction<IItem[]>>;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	openItemModal: React.MouseEventHandler;
}

export const Header: React.FC<IProps> = ({
	items,
	setItems,
	setModalOpen,
	openItemModal,
}) => {
	const exportList = () => {
		const rawItems = localStorage.getItem('items');

		if (!rawItems) {
			return swal({
				title: 'No hay datos para descargar',
				text: 'Asegúrate de añadir productos a la lista antes de exportarla.',
			});
		}

		const itemsAsObject = JSON.parse(rawItems);

		if (!itemsAsObject || itemsAsObject.length <= 0) {
			return swal({
				title: 'No hay datos para descargar',
				text: 'Asegúrate de añadir productos a la lista antes de exportarla.',
			});
		}

		const generatedUrl = `data:text/json;charset=utf-8,${encodeURIComponent(
			rawItems
		)}`;
		const currentDate = new Date();
		const day = currentDate.getDate();
		const month = currentDate.getMonth() + 1;
		const year = currentDate.getFullYear();
		const anchorElement = document.createElement('a');
		anchorElement.setAttribute('href', generatedUrl);
		anchorElement.setAttribute(
			'download',
			`shoppalist-${day}-${month}-${year}.json`
		);
		anchorElement.classList.add('hidden');
		document.body.append(anchorElement);
		anchorElement.click();
		anchorElement.remove();
	};

	const clearList = () => {
		swal({
			title: 'Limpiar lista',
			text: '¿Deseas limpiar la lista actual? Perderás todos los productos registrados.',
			buttons: ['Cancelar', 'Limpiar'],
			dangerMode: true,
		}).then(confirmed => {
			if (!confirmed) return;

			setItems([]);
		});
	};

	const openModal = () => setModalOpen(true);

	return (
		<header className="fixed bottom-0 bg-blue-500 py-2 flex flex-wrap items-center justify-between text-white w-full">
			<p className="text-right m-0 flex items-center justify-center">
				{items.length > 0 && (
					<button
						className="text-red-600 mx-2 p-1 text-2xl"
						style={{ textDecoration: 'none' }}
						title="Limpiar lista"
						onClick={clearList}
					>
						<i className="fas fa-times"></i>
					</button>
				)}
				<button
					className="text-white mx-2 p-1"
					style={{ textDecoration: 'none' }}
					title="Exportar lista"
					onClick={exportList}
				>
					<i className="fas fa-download"></i>
				</button>
				<button
					className="text-white mx-2 p-1"
					style={{ textDecoration: 'none' }}
					title="Importar lista"
					onClick={openModal}
				>
					<i className="fas fa-upload"></i>
				</button>
			</p>
			<div className="flex items-center justify-end pr-2">
				<button
					type="button"
					className={`${buttonPrimaryStyles
						.replace('rounded', 'w-10 h-10 rounded-full')
						.replace('bg-blue-500', 'bg-blue-800')} py-2 px-2 shadow flex items-center justify-center`}
					onClick={openItemModal}
					title="Agregar Producto"
				>
					<i className="fas fa-plus"></i>
				</button>
			</div>
		</header>
	);
};
