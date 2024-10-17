
import React from 'react';
import ReactDOM from 'react-dom';


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className=' fixed top-0 left-0 right-0 bottom-0 bg-cyan-100 flex justify-center items-center'>
            <div className='bg-white p-[20px] border-r-[5px] w-[60%] shadow-xl'>
                <button onClick={onClose}>Close</button>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement // Убедитесь, что данный элемент существует
    );
};

export default Modal;
