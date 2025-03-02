import * as React from 'react';
import { useContext, useEffect } from 'react';
import { PacmanLoader } from 'react-spinners';
import { UIContext } from '@/hooks/context/UIContext';
import Modal from '@/components/common/Modal';

const Spinner = () => {
	const {
		loading,
		dispatch,
		isModalOpen
	} = useContext(UIContext);

	useEffect(() => {
		if (loading && !isModalOpen) {
			dispatch({ type: 'TOGGLE_MODAL' });
		}
		
		if (!loading && isModalOpen) {
			dispatch({ type: 'TOGGLE_MODAL' });
		}
	}, [loading]);

	return <Modal>
		{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
		<div className="w-full h-full flex justify-center items-center" onClick={(event) => {
			event.preventDefault();
			event.stopPropagation();
		}}>
			<PacmanLoader color='#6BC134' loading={loading} size={40} />
		</div>
	</Modal>;
};

export default Spinner;
