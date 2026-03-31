import React from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) {
    return null
  }

  const handleInnerClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }
  //className={clsx(big ? "w-[60%]" : "w-[40%]",'bg-white p-[20px] border-r-[5px] h-[40vh] rounded-[15px]')}

  return ReactDOM.createPortal(
    <div
      className=" fixed top-0 left-0 right-0 bottom-0 bg-bgModal flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="flex h-[400px] w-[90%] flex-col rounded-[15px] bg-white p-[10px] lg:w-[60%] lg:p-[20px] [--modal-height:400px]"
        onClick={handleInnerClick}
      >
        <div className="flex shrink-0 justify-end px-2">
          <button
            onClick={onClose}
            className="h-[30px] w-[30px] hover:bg-slate-300"
          >
            &#10005;
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement, // Убедитесь, что данный элемент существует
  )
}

export default Modal
