import swal from 'sweetalert';
import { IItem } from '../interfaces';

interface IProps {
	items: IItem[];
	setItems: React.Dispatch<React.SetStateAction<IItem[]>>;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<IProps> = ({ items, setItems, setModalOpen }) => {
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
		<header className="bg-blue-500 py-2 flex flex-wrap items-center justify-between text-white mb-3">
			<h1 className="h3 m-0 pl-2">
				<i className="fas fa-shopping-cart"></i> Shoppalist
			</h1>
			<p className="text-right m-0 flex items-center">
				<a
					className="text-white mx-2"
					style={{ textDecoration: 'none' }}
					href="mailto:lehuertad95@gmail.com?subject=Shoppalist"
					title="Contáctame a través de lehuertad95@gmail.com"
				>
					<i className="fas fa-envelope"></i>
				</a>
				{items.length > 0 && (
					<button
						className="text-white mx-2 p-1"
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
		</header>
	);
};
