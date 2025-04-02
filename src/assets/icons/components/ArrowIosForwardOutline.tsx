import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgArrowIosForwardOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <defs>
      <clipPath id={'arrow-ios-forward-outline_svg__a'}>
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
    <g clipPath={'url(#arrow-ios-forward-outline_svg__a)'}>
      <path
        d={
          'M10 19c-.24 0-.47-.09-.65-.23-.1-.09-.18-.19-.24-.31a.9.9 0 0 1-.11-.37 1.02 1.02 0 0 1 .22-.73L13.71 12 9.38 6.63c-.08-.11-.14-.22-.18-.35-.03-.13-.05-.26-.03-.39.01-.13.05-.26.11-.37.07-.12.15-.22.25-.3.11-.1.23-.16.36-.21.13-.04.27-.05.41-.04.13.02.27.06.39.13.12.06.22.15.31.27l4.83 6c.14.17.22.4.22.63s-.08.46-.22.64l-5 6c-.11.12-.23.21-.38.27-.14.07-.3.09-.45.09'
        }
        fill={'#000'}
      />
    </g>
  </svg>
)
const ForwardRef = forwardRef(SvgArrowIosForwardOutline)
const Memo = memo(ForwardRef)

export default Memo
