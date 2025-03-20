import dashboard from '@/app/(route)/admin/content/dashboard/style.css'
import AnalyticsBox, {AnalyticsData} from '@/core/component/admin/analytics-box'
import DayTab from '@/core/component/admin/dayTab'

const dummy: { [key: string]: AnalyticsData } = {
  visit: {prev: 5000, now: 2330},
  user: {prev: 1234, now: 4249},
  issue: {prev: 10, now: 5},
  report: {prev: 4, now: 10},
}

const Page = () => {
  return <div className={dashboard.wrapper}>
    <DayTab />
    <div className={dashboard.box.list}>
      <AnalyticsBox title={'방문자 수'} unit={'명'} data={dummy.visit}/>
      <AnalyticsBox title={'가입자 수'} unit={'명'} data={dummy.user}/>
      <AnalyticsBox title={'등록된 이슈'} unit={'개'} data={dummy.issue}/>
      <AnalyticsBox title={'신고 개수'} unit={'개'} data={dummy.report}/>
    </div>
  </div>
}

export default Page
