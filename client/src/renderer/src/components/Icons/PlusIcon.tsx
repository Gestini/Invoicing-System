import { SVGProps } from 'react'
type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export const PlusIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => (
  <svg
    aria-hidden='true'
    focusable='false'
    height={size || height}
    role='presentation'
    viewBox='0 0 24 24'
    width={size || width}
    {...props}
  >
    <g
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
    >
      <path d='M6 12h12' />
      <path d='M12 18V6' />
    </g>
  </svg>
)
