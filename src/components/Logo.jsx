import LogoSvg from '@/images/logos/logo.svg'
import Image from 'next/image'
import LogoPicture from '@/images/logos/logo.png';

export function Logo(props) {
  return (         
    <Image src={LogoPicture} width={150} height={30} alt="maildub" />
  )
}
