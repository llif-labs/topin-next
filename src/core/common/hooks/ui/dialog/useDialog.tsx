import {createRoot, Root} from 'react-dom/client'
import {dialogStyle} from '@/core/common/hooks/ui/dialog/dialogStyle.css'

let dialogRoot: Root | null = null
let dialogContainer: Element | null = null

const useDialog = () => {

  const mountDialog = (
    buttonSize: 1 | 2 | 3 = 1,
    confirmText?: string,
    confirmAction?: () => void,
    choiceText?: string,
    choiceAction?: () => void,
  ) => {
    if (!dialogContainer) {
      dialogContainer = document.createElement('div')
      document.body.appendChild(dialogContainer)
      dialogRoot = createRoot(dialogContainer)
    }

    const ui = (
      <div className={dialogStyle.bg} onClick={unmountDialog}>
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

    dialogRoot?.render(ui)
  }

  const unmountDialog = () => {
    if (dialogRoot && dialogContainer && dialogContainer.parentNode) {
      dialogRoot.unmount()
      dialogContainer.parentNode.removeChild(dialogContainer)
      dialogRoot = null
      dialogContainer = null
    }
  }

  return {mountDialog, unmountDialog}
}

export default useDialog
