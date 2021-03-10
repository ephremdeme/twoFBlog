import React, {useState, useEffect, createRef} from 'react';
import {Container} from '@material-ui/core';
import {ReactComponent as MessageLogo} from '../../public/icons/icons8_message.svg';
import {ReactComponent as CloseMessage} from '../../public/icons/icons8_delete_sign_4.svg';
import {ReactComponent as Message} from '../../public/icons/icons8_filled_message.svg';
import {ReactComponent as SendMessage} from '../../public/icons/icons8_paper_plane.svg';
import firebase from '../../firebase/firebase';
import './Chat.css';
import {RootState} from '../../app/store';
import {useSelector} from 'react-redux';

interface IItems {
	date: Date;
	message: string;
	sender: string;
	to: string;
}

const Chatbox = (): JSX.Element => {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<IItems[]>([]);
	const referance = createRef<any>();
	const role = useSelector((state: RootState) => state.user.role);
	const email = useSelector((state: RootState) => state.user.email);

	const onSendMessage = (e: any) => {
		e.preventDefault();
		if (message) {
			firebase
				.getInstance()
				.database.ref('messages')
				.push()
				.set({
					sender: role === 'admin' ? 'Admin' : email,
					message: message,
					date: Date(),
					to: 'Admin',
				});
			setMessage('');
			onGetMessage();
		}
	};

	const onGetMessage = () => {
		const items: any = [];
		firebase
			.getInstance()
			.database.ref('messages')
			.orderByChild('date')
			.on('child_added', (snapshot) => {
				if (role === 'admin') {
					items.push(snapshot.val());
					setMessages(items);
				} else {
					if (
						snapshot.val().sender === email ||
						snapshot.val().sender === 'Admin'
					) {
						items.push(snapshot.val());
						setMessages(items);
					}
				}
			});

		return referance.current.scrollIntoView({behavior: 'smooth'});
	};

	useEffect(() => {
		referance.current.scrollIntoView({behavior: 'smooth'});
		onGetMessage();
	}, []);

	useEffect(() => {
		referance.current.scrollIntoView({behavior: 'smooth'});
	});

	return (
		<Container>
			<div className="message"></div>

			<div className="chat-widget" id="chatWidget">
				{/* <!-- chat toggle --> */}
				<input
					id="chat-widget-toggle"
					className="chat-widget-toggle"
					type="checkbox"
				/>

				{/* <!-- chat close button --> */}
				<label
					title="close chat"
					htmlFor="chat-widget-toggle"
					className="chat-widget-button chat-close-button">
					<CloseMessage />
				</label>

				<div className="chat-box">
					{/* <!-- chat user info     --> */}
					<div className="chat-avatar-box">
						<Message className="chat-avatar" />
					</div>

					<div className="chat-message-box">
						{/* <!--  chat header --> */}
						<div className="chat-header">
							<h1 className="chat-title">
								<span className="chat-title-primary">Chat</span>
							</h1>
						</div>

						{/* <!--   chat message  --> */}
						<div className="chat-messages">
							<div className="chat-messages-content">
								{role === 'admin'
									? messages.map((v, index) =>
											v.sender === 'Admin' ? (
												<div className="chat-message -right" key={index}>
													<div className="chat-message-text">{v.message}</div>
												</div>
											) : (
												<div className="chat-message -left" key={index}>
													<div className="chat-message-text">{v.message}</div>
												</div>
											)
									  )
									: messages.map((v, index) =>
											v.sender === email ? (
												<div className="chat-message -right" key={index}>
													<div className="chat-message-text">{v.message}</div>
												</div>
											) : (
												<div className="chat-message -left" key={index}>
													<div className="chat-message-text">{v.message}</div>
												</div>
											)
									  )}
								<div ref={referance} />
							</div>
						</div>

						{/* <!-- chat input box  --> */}
						<div className="chat-form-box">
							<form
								className="chat-form"
								id="chat-form"
								name="chat-form"
								onSubmit={onSendMessage}>
								<input
									className="chat-form-input"
									type="text"
									placeholder="Type your message...."
									value={message}
									onChange={(e) => {
										setMessage(e.target.value);
									}}
								/>
								<button
									title="send message"
									type="submit"
									className="chat-form-button">
									<SendMessage />
								</button>
							</form>
						</div>
					</div>
				</div>

				{/* <!-- chat open button --> */}
				<label
					title="open chat"
					htmlFor="chat-widget-toggle"
					className="chat-widget-button chat-open-button chat-widget-toggle"
					onClick={onGetMessage}>
					<MessageLogo />
				</label>
			</div>
		</Container>
	);
};

export default Chatbox;
