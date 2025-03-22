import React, {useState, useEffect} from 'react'

// SvgIconProps 타입 정의
interface SvgIconProps {
  size?: number;
  fill?: string;
  stroke?: string;
  src: string; // 예: '/assets/svg/icon1.svg'
}

const SvgIcon: React.FC<SvgIconProps> = ({size = 20, fill = '#000', stroke = '#000', src}) => {
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
    `<svg$1 width="${size}" height="${size}" fill="${fill}" style="stroke: ${stroke}; transition: fill 0.3s ease, stroke 0.3s ease;">`  )

  return (
    <div
      style={{display: 'inline-block', width: size, height: size}}
      dangerouslySetInnerHTML={{__html: modifiedSvg}}
      aria-label="SVG Icon"
    />
  )
}

export default SvgIcon
