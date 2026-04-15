import React from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  /** Высота до ~90vh, скролл внутри — для длинных форм */
  tall?: boolean
}

function Modal({ isOpen, onClose, children, tall = false }: ModalProps) {
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
        className={
          tall
            ? 'flex max-h-[90vh] w-[90%] flex-col rounded-[15px] bg-white p-[10px] lg:w-[60%] lg:p-[20px] [--modal-height:min(90vh,800px)]'
            : 'flex h-[400px] w-[90%] flex-col rounded-[15px] bg-white p-[10px] lg:w-[60%] lg:p-[20px] [--modal-height:400px]'
        }
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
        <div
          className={
            tall ? 'min-h-0 flex-1 overflow-y-auto overflow-x-hidden' : 'min-h-0 flex-1 overflow-hidden'
          }
        >
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement, 
  )
}

export default Modal
