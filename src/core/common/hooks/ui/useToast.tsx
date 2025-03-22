import {createRoot, Root} from 'react-dom/client'
import toastStyle from '@/core/common/hooks/ui/toastStlye.css'
import SvgIcon from '@/core/module/svgIcon'
import {ToastColor} from '@/style/adminStyle.css'

interface ToastInterface {
  id: string
  type: 'warning' | 'info'
  message: string
  duration?: number
}

// 전역 상태와 DOM 관리
let toastRoot: Root | null = null
let toastContainer: Element | null = null
let globalToasts: ToastInterface[] = []
const timers: { [id: string]: NodeJS.Timeout } = {}

const renderToasts = () => {
  if (!toastContainer || !toastRoot) return

  const ui = (
    <div className={toastStyle.list.body}>
      {globalToasts.map((toast) => (
        <div className={`${toastStyle.list.item} ${toast.type}`}
             key={toast.id}
             onClick={() => removeToast(toast.id)}>
          {
            toast.type === 'warning' ?
              <SvgIcon src={'/assets/svg/icon/alert-circle-outline-icon.svg'} size={15} fill={ToastColor.warning.color} stroke={ToastColor.warning.color}/> :
              <SvgIcon src={'/assets/svg/icon/check-outline-icon.svg'} size={15} fill={ToastColor.info.color} stroke={ToastColor.info.color}/>
          }
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  )

  toastRoot.render(ui)
}

const addToast = (toast: Omit<ToastInterface, 'id'>) => {

  if (!toastContainer) {
    toastContainer = document.createElement('div')
    document.body.appendChild(toastContainer)
    toastRoot = createRoot(toastContainer)
    renderToasts()
  }

  const newToast = {
    ...toast,
    id: Math.random().toString(36).substr(2, 9),
    duration: toast.duration ?? 2000,
  }
  globalToasts = [...globalToasts, newToast]

  // 타이머 설정
  timers[newToast.id] = setTimeout(() => {
    removeToast(newToast.id)
  }, newToast.duration)

  renderToasts()
}

const removeToast = (id: string) => {
  globalToasts = globalToasts.filter((toast) => toast.id !== id)
  if (timers[id]) {
    clearTimeout(timers[id])
    delete timers[id]
  }
  if (globalToasts.length === 0 && toastRoot && toastContainer && toastContainer.parentNode) {
    toastRoot.unmount()
    toastContainer.parentNode.removeChild(toastContainer)
    toastRoot = null
    toastContainer = null
  } else {
    renderToasts()
  }
}

const useToast = () => {

  return {addToast}
}

export default useToast

if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `
  document.head.appendChild(styleSheet)
}
