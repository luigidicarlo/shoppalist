import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ItemsProvider } from './components/ItemsContext';
import { ModalsProvider } from './components/ModalsContext';
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
