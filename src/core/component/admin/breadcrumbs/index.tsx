import {usePathname} from 'next/navigation'

const Index = () => {

  const pathanme = usePathname()


  console.log(pathanme)

  return <>
  </>
}

export default Index
