import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgCheckmarkOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <defs>
      <clipPath id={'checkmark-outline_svg__a'}>
        <rect
          fill={'#fff'}
          fillOpacity={0}
          height={23}
          rx={0}
          transform={'translate(.5 .5)'}
          width={23}
        />
      </clipPath>
    </defs>
    <rect fill={'none'} height={23} rx={0} transform={'translate(.5 .5)'} width={23} />
    <g clipPath={'url(#checkmark-outline_svg__a)'}>
      <path
        d={
          'M9.85 18c-.13-.01-.27-.03-.39-.09a.86.86 0 0 1-.33-.23l-4.87-5.17c-.18-.2-.27-.46-.27-.72.01-.27.13-.52.32-.7s.45-.28.72-.27c.26.01.51.12.69.32l4.13 4.39 8.41-9.2c.08-.11.19-.2.31-.26.12-.07.25-.1.39-.12.13-.01.27.01.4.05.13.05.24.12.35.21.1.09.18.2.23.33q.09.18.09.39c.01.14-.02.27-.07.4s-.13.24-.22.34l-9.14 10c-.1.1-.21.18-.34.24-.12.05-.26.08-.39.09z'
        }
        fill={'#000'}
      />
    </g>
  </svg>
)
const ForwardRef = forwardRef(SvgCheckmarkOutline)
const Memo = memo(ForwardRef)

export default Memo
