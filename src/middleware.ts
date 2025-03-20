import {withAdmin} from '@/middleware/interceptor/withAdmin'
import {stackHandler} from '@/middleware/stackHandler'
import {withBasic} from '@/middleware/interceptor/withBasic'

const middleware = [
  withBasic,
  withAdmin
]

export default stackHandler(middleware)
