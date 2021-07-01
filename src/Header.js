export default function Header() {
	return (
		<header className="bg-primary py-2 d-flex flex-wrap align-items-center justify-content-between text-white mb-3">
			<h1 className="h3 m-0">Shoppalist</h1>
			<p className="text-right m-0">
				Desarrollado por Luis Huerta
				<a
					className="text-white mx-2"
					style={{ textDecoration: 'none' }}
					href="mailto:lehuertad95@gmail.com?subject=Shoppalist"
					title="Contáctame a través de lehuertad95@gmail.com"
				>
					<i className="fas fa-envelope"></i>
				</a>
			</p>
		</header>
	);
}
