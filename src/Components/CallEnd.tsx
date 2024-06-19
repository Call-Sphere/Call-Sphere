import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { cleanNumber } from '../Utils/Cleaners';
import Button from './Button';
import Loader from './Loader';

function CallEnd({
	client,
	time,
	credentials,
	nextCall
}: {
	client: Client;
	time: number;
	credentials: Credentials;
	nextCall: () => void;
}) {
	const VALUES = [
		{ name: 'Compte voter', value: 2 },
		{ name: 'Ne compte pas voter', value: 1 },
		{ name: 'Pas interessé·e', value: -1 },
		{ name: 'À retirer', value: -2 },
		{ name: 'Pas de réponse', value: 0 }
	];

	const [Loading, setLoading] = useState(false);
	const navigate = useNavigate();

	function click() {
		const satisfaction = parseInt((document.getElementById('satisfaction') as HTMLInputElement).value);
		let comment: string | undefined = (document.getElementById('comment') as HTMLInputElement).value.trim();

		if (comment === '') {
			comment = undefined;
		}

		setLoading(true);
		post(satisfaction, comment).then(res => {
			if (res) {
				nextCall();
			} else {
				setLoading(false);
			}
		});
	}

	async function post(satisfaction: number, comment?: string) {
		try {
			await axios.post(credentials.URL + '/endCall', {
				phone: credentials.phone,
				pinCode: credentials.pinCode,
				area: credentials.area,
				timeInCall: time,
				comment: comment,
				satisfaction: satisfaction
			});
			return true;
		} catch (err: any) {
			if (err.response?.data?.message) {
				return true;
			} else {
				console.error(err);
				return false;
			}
		}
	}

	async function cancel() {
		try {
			await axios.post(credentials.URL + '/giveUp', {
				phone: credentials.phone,
				pinCode: credentials.pinCode,
				area: credentials.area
			});
			return true;
		} catch (err: any) {
			console.error(err);
			return false;
		}
	}

	return (
		<div className="CallingEndContainer">
			<div className="CallingEnded">
				<div className="UserEnded">
					<h2 className="UserNameEnded">{client.name}</h2>
					<div className="Phone">{cleanNumber(client.phone)}</div>
				</div>
				<h3>Comment s'est passé cet appel ?</h3>
			</div>
			<div className="CallingButtons">
				<select className="inputField" id="satisfaction" defaultValue={0}>
					{VALUES.map((value, i) => {
						return (
							<option key={i} value={value.value}>
								{value.name}
							</option>
						);
					})}
				</select>
				<textarea className="inputField comment" placeholder="Commentaire" id="comment"></textarea>
				<Button value="Confirmer" onclick={click} />
				<Button
					value="Annuler"
					onclick={() => {
						setLoading(true);
						cancel().then(res => {
							if (res) {
								navigate('/');
							} else {
								setLoading(false);
							}
						});
					}}
					type="RedButton"
				/>
			</div>
			{Loading ? <Loader /> : <></>}
		</div>
	);
}

export default CallEnd;
