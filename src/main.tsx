import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ItemsProvider } from './components/Contexts/ItemsContext';
import { ModalsProvider } from './components/Contexts/ModalsContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ItemsProvider>
			<ModalsProvider>
				<App />
			</ModalsProvider>
		</ItemsProvider>
	</React.StrictMode>
);

const appHeight = () => {
	const doc = document.documentElement;
	doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};
window.addEventListener('resize', appHeight);
appHeight();
