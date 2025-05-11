
import clsx from 'clsx';
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

    const handleInnerClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };
    //className={clsx(big ? "w-[60%]" : "w-[40%]",'bg-white p-[20px] border-r-[5px] h-[40vh] rounded-[15px]')}

    return ReactDOM.createPortal(
        <div className=' fixed top-0 left-0 right-0 bottom-0 bg-bgModal flex justify-center items-center' onClick={onClose}>
            <div className='w-full lg:w-[60%] bg-white p-[10px] lg:p-[20px] border-r-[5px] h-[60vh] lg:h-[40vh] rounded-[15px]' onClick={handleInnerClick}>
                <div className='flex justify-end px-2'>
                    <button onClick={onClose} className='w-[30px] h-[30px] hover:bg-slate-300'>
                        &#10005;
                    </button>
                </div>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement // Убедитесь, что данный элемент существует
    );
};

export default Modal;
