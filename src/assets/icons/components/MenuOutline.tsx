import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgMenuOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <defs>
      <clipPath id={'menu-outline_svg__a'}>
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
    <g clipPath={'url(#menu-outline_svg__a)'} fill={'#000'} fillRule={'evenodd'}>
      <path
        d={
          'M3.95 11h16.09c.53 0 .96.42.96.95v.1c0 .52-.43.95-.96.95H3.95a.95.95 0 0 1-.95-.95v-.1c0-.53.42-.95.95-.95M3.95 16h16.09c.53 0 .96.42.96.95v.09c0 .53-.43.96-.96.96H3.95c-.53 0-.95-.43-.95-.96v-.09c0-.53.42-.95.95-.95M3.95 6h16.09c.53 0 .96.42.96.95v.09c0 .53-.43.96-.96.96H3.95C3.42 8 3 7.57 3 7.04v-.09c0-.53.42-.95.95-.95'
        }
      />
    </g>
  </svg>
)
const ForwardRef = forwardRef(SvgMenuOutline)
const Memo = memo(ForwardRef)

export default Memo
