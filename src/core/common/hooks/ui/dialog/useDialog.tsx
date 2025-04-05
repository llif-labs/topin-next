'use client'

import {createRoot, Root} from 'react-dom/client'
import {dialogStyle} from '@/core/common/hooks/ui/dialog/dialogStyle.css'
import {useEffect, useRef, useState} from 'react'


const useDialog = () => {

  const [isVisible, setIsVisible] = useState<boolean>(false)
  const dialogContainerRef = useRef<HTMLElement | null>(null)
  const dialogRootRef = useRef<Root | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)


  const mountDialog = (
    buttonSize: 1 | 2 | 3 = 1,
    confirmText?: string,
    confirmAction?: () => void,
    choiceText?: string,
    choiceAction?: () => void,
  ) => {
    if (!dialogContainerRef.current) {
      const container = document.createElement('div')
      document.body.appendChild(container)
      dialogContainerRef.current = container
      dialogRootRef.current = createRoot(container)
    }

    const ui = (
      <div ref={dialogRef}
           className={dialogStyle.bg}
           onClick={unmountDialog}>
        <div className={dialogStyle.body.wrapper} onClick={e => {
          e.stopPropagation()
        }}>
          <div className={dialogStyle.body.content}>
            asdf
          </div>
          <div className={dialogStyle.button.body}>
            <button className={dialogStyle.button.cancel} onClick={unmountDialog}>
              닫기
            </button>
            {
              buttonSize >= 2 && <button className={dialogStyle.button.confirm} onClick={confirmAction}>
                {confirmText}
              </button>
            }
            {
              buttonSize >= 3 && <button className={dialogStyle.button.choice} onClick={choiceAction}>
                {choiceText}
              </button>
            }

          </div>
        </div>
      </div>
    )


    dialogRootRef.current?.render(ui)
    setTimeout(() => {
      setIsVisible(true)
    }, 0)
  }

  const unmountDialog = () => {

    setIsVisible(false)
  }

  useEffect(() => {
    dialogRef.current?.classList.remove('open', 'close')

    if (isVisible && dialogRef.current) {
      dialogRef.current?.classList.add('open')
    } else {
      dialogRef.current?.classList.add('close')
      setTimeout(() => {
        if (dialogRootRef.current && dialogContainerRef.current && dialogContainerRef.current.parentNode) {
          dialogRootRef.current.unmount()
          dialogContainerRef.current.parentNode.removeChild(dialogContainerRef.current)
          dialogRootRef.current = null
          dialogContainerRef.current = null
        }
      }, 100)
    }
  }, [isVisible, dialogContainerRef.current, dialogContainerRef.current?.children])

  return {mountDialog, unmountDialog}
}

export default useDialog
