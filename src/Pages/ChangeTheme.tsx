import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../Components/Button';
import { getThemes } from '../Components/ThemeProvider';
import { setLocalTheme } from '../Utils/Storage';

function ChangeTheme({ Theme, setTheme }: { Theme: string; setTheme: (themeID: string) => void }) {
	const themes = getThemes();
	const navigate = useNavigate();
	const oldTheme = useRef(Theme ?? 'default');

	function change() {
		const themeID = (document.getElementById('theme') as HTMLInputElement).value;
		setTheme(themeID);
		setLocalTheme(themeID);
	}

	function cancel() {
		setTheme(oldTheme.current);
		setLocalTheme(oldTheme.current);
		navigate('/Settings');
	}

	function click() {
		change();
		navigate('/Settings');
	}

	return (
		<div className="Dashboard">
			<h1>Changer de thème</h1>
			<select className="inputField" id="theme" onChange={change} defaultValue={oldTheme.current}>
				{themes.map((theme, i) => {
					return (
						<option key={i} value={theme.name}>
							{theme.value.name}
						</option>
					);
				})}
			</select>
			<Button value="Valider" onclick={click} />
			<Button value="Annuler" type="RedButton" onclick={cancel} />
		</div>
	);
}

export default ChangeTheme;
