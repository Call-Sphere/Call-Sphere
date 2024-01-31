import React from 'react';
import ReactDOM from 'react-dom/client';

import './Stylesheets/index.css';
import './Stylesheets/mobile.css';

import './declarations.d.ts';

import App from './App';
import ChooseArea from './Pages/ChooseArea';
import LoginPage from './Pages/Login';
import { mobileCheck } from './Utils';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

function renderApp(caller: Caller, credentials: Credentials, areas: Array<AreaCombo>) {
	root.render(
		<React.StrictMode>
			<App credentials={credentials} caller={caller} areas={areas} renderLogin={renderLogin} />
		</React.StrictMode>
	);
}

function chooseArea(caller: Caller, credentials: Credentials, areas: Array<AreaCombo>) {
	root.render(
		<React.StrictMode>
			<ChooseArea
				renderApp={(area: string) => {
					credentials.area = area;
					window.localStorage.setItem('credentials', JSON.stringify(credentials));
					renderApp(caller, credentials, areas);
				}}
				areas={areas}
			/>
		</React.StrictMode>
	);
}

function renderLogin() {
	root.render(
		<React.StrictMode>
			<LoginPage chooseArea={chooseArea} isMobile={mobileCheck()} />
		</React.StrictMode>
	);
}

renderLogin();
