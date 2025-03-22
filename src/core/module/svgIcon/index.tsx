import React, {useState, useEffect} from 'react'
import {svgIcon} from '@/core/module/svgIcon/style.css'

// SvgIconProps 타입 정의
interface SvgIconProps {
  className?: string
  size?: number;
  fill?: string;
  stroke?: string;
  src: string; // 예: '/assets/svg/icon1.svg'
}

const SvgIcon: React.FC<SvgIconProps> = ({size = 20, fill = '#000', stroke = '#000', className, src}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null)

  useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch(src)
        if (!response.ok) throw new Error(`Failed to fetch SVG: ${src}`)
        const text = await response.text()
        setSvgContent(text)
      } catch (error) {
        console.error(error)
        setSvgContent(null)
      }
    }

    loadSvg()
  }, [src])

  if (!svgContent) return

  // SVG에 동적으로 속성 추가 (viewBox 유지)
  const modifiedSvg = svgContent.replace(
    /<svg([^>]*)>/,
    `<svg class=${svgIcon} $1 width="${size}" height="${size}" fill="${fill}">`
  )

  return (
    <div
      className={className}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        stroke: stroke
    }}
      dangerouslySetInnerHTML={{__html: modifiedSvg}}
      aria-label="SVG Icon"
    />
  )
}

export default SvgIcon
