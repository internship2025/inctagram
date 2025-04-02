import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgClose = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <defs>
      <clipPath id={'close_svg__a'}>
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
    <g clipPath={'url(#close_svg__a)'}>
      <path
        d={
          'm13.41 12 4.29-4.29c.19-.19.3-.45.3-.71 0-.27-.11-.53-.3-.71a.976.976 0 0 0-1.41 0L12 10.59l-4.3-4.3a.976.976 0 0 0-1.41 0c-.19.18-.3.44-.3.71 0 .26.11.52.3.71l4.3 4.29-4.3 4.29c-.1.09-.17.2-.22.32s-.08.25-.08.39a1 1 0 0 0 .3.7c.09.1.2.17.32.22s.25.08.39.08a1 1 0 0 0 .7-.3l4.3-4.29 4.29 4.29c.09.1.2.17.32.22s.25.08.39.08a1 1 0 0 0 .7-.3.995.995 0 0 0 .3-.7c0-.14-.03-.27-.08-.39a.9.9 0 0 0-.22-.32z'
        }
        fill={'#000'}
      />
    </g>
  </svg>
)
const ForwardRef = forwardRef(SvgClose)
const Memo = memo(ForwardRef)

export default Memo
