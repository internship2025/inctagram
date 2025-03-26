import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgBookmark = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <defs>
      <clipPath id={'bookmark_svg__a'}>
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
    <g clipPath={'url(#bookmark_svg__a)'}>
      <path
        d={
          'M6 21c-.18-.01-.35-.05-.49-.13-.16-.09-.29-.22-.38-.37A1 1 0 0 1 5 20V5.32c-.02-.59.2-1.18.62-1.61.41-.44.98-.69 1.58-.71h9.59c.6.02 1.17.27 1.58.71.42.43.64 1.02.63 1.61V20c-.01.17-.05.34-.14.49s-.21.28-.36.37c-.16.08-.33.13-.5.13-.18 0-.35-.05-.5-.13l-5.67-3.21-5.33 3.2c-.16.09-.33.14-.5.15'
        }
        fill={'#000'}
      />
    </g>
  </svg>
)
const ForwardRef = forwardRef(SvgBookmark)
const Memo = memo(ForwardRef)

export default Memo
