import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgHomeOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <defs>
      <clipPath id={'home-outline_svg__a'}>
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
    <g clipPath={'url(#home-outline_svg__a)'}>
      <path
        d={
          'M20.42 10.18 12.71 2.3c-.1-.1-.21-.17-.33-.22A1 1 0 0 0 12 2c-.14 0-.27.03-.39.08s-.23.12-.32.22l-7.71 7.88c-.19.19-.34.42-.44.66-.1.25-.15.51-.14.78V20c-.01.51.19 1 .54 1.37s.83.6 1.35.63h14.22c.51-.03.99-.26 1.34-.63S21 20.51 21 20v-8.38c0-.54-.21-1.06-.58-1.44M10 20v-6h4v6zm9 0h-3v-7a1 1 0 0 0-.3-.71.98.98 0 0 0-.7-.29H9a.99.99 0 0 0-1 1v7H5v-8.42l7-7.16 7 7.2z'
        }
        fill={'currentColor'}
      />
    </g>
  </svg>
)
const ForwardRef = forwardRef(SvgHomeOutline)
const Memo = memo(ForwardRef)

export default Memo
