import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgTrendingUpOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <defs>
      <clipPath id={'trending-up-outline_svg__a'}>
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
    <g clipPath={'url(#trending-up-outline_svg__a)'}>
      <path
        d={
          'M21 7v-.22a1 1 0 0 0-.05-.16c-.03-.05-.06-.1-.09-.14a.6.6 0 0 0-.14-.17l-.12-.07a.6.6 0 0 0-.19-.1h-.21A.7.7 0 0 0 20 6h-5a.99.99 0 0 0-1 1c0 .26.1.51.29.7A1 1 0 0 0 15 8h2.83l-4 4.71-4.32-2.57a.98.98 0 0 0-.69-.13c-.23.04-.44.16-.6.35l-5 6a1 1 0 0 0-.22.73c.01.13.05.26.11.37.06.12.14.22.24.31.18.14.41.23.65.23.14 0 .29-.04.42-.1s.25-.15.35-.26l4.44-5.34 4.28 2.56c.2.12.44.16.67.12s.44-.16.6-.33L19 9.7V12c0 .26.1.51.29.7a1 1 0 0 0 .71.3c.26 0 .51-.11.7-.3s.3-.44.3-.7z'
        }
        fill={'currentColor'}
      />
    </g>
  </svg>
)
const ForwardRef = forwardRef(SvgTrendingUpOutline)
const Memo = memo(ForwardRef)

export default Memo
