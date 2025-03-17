import box from '@/core/component/admin/analytics-box/style.css'

export interface AnalyticsData {
  prev: number;
  now: number;
}

interface AnalyticsInterface {
  title: string;
  unit: string;
  data: AnalyticsData;
}

const Index = (props: AnalyticsInterface) => {
  const {title, unit, data} = props
  const change = data.now - data.prev
  const changeClass = change >= 0 ? box.content.change.increase : box.content.change.decrease
  const badgeClass = change >= 0 ? box.content.badge.increase : box.content.badge.decrease

  const percentageChange = data.prev === 0
    ? (data.now === 0 ? 0 : Infinity) // prev와 now가 모두 0이면 0%, 아니면 무한대
    : ((data.now - data.prev) / data.prev) * 100

  // 퍼센트 값 포맷팅
  const formattedPercentage = Number.isFinite(percentageChange)
    ? `${percentageChange >= 0 ? '+' : ''}${percentageChange.toFixed(1)}%`
    : 'N/A' // 무한대일 경우 'N/A' 표시

  return (
    <div className={box.content.item}>
      <div className={box.content.left}>
        <p className={box.content.title}>{title}</p>
        <p className={box.content.value}>
          {data.now.toLocaleString()} {unit}
        </p>
        <p className={box.content.change.text}>
          <span className={changeClass}>
            {change >= 0 ? `+${change.toLocaleString()}` : change.toLocaleString()}
          </span>{' '}
          전월 대비 {title} 증감량
        </p>
      </div>
      <div className={badgeClass}>
        {formattedPercentage}
      </div>
    </div>
  )
}

export default Index
