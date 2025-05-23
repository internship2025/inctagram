import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgTrashOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <defs>
      <clipPath id={'trash-outline_svg__a'}>
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
    <g clipPath={'url(#trash-outline_svg__a)'}>
      <path
        d={
          'M21 6h-5V4.33a2.45 2.45 0 0 0-.77-1.69c-.47-.43-1.09-.67-1.73-.64h-3c-.65-.03-1.27.21-1.74.64-.47.44-.74 1.04-.76 1.69V6H3a.99.99 0 0 0-1 1c0 .26.1.51.29.7A1 1 0 0 0 3 8h1v11c0 .79.31 1.55.87 2.12.57.56 1.33.88 2.13.88h10c.79 0 1.55-.32 2.12-.88.56-.57.88-1.33.88-2.12V8h1c.26 0 .51-.11.7-.3s.3-.44.3-.7a1 1 0 0 0-.3-.71A.98.98 0 0 0 21 6M10 4.33c0-.16.21-.33.5-.33h3c.29 0 .5.17.5.33V6h-4zM18 19c0 .26-.11.51-.3.7s-.44.3-.7.3H7a1 1 0 0 1-.71-.3A.98.98 0 0 1 6 19V8h12z'
        }
        fill={'#000'}
      />
    </g>
  </svg>
)
const ForwardRef = forwardRef(SvgTrashOutline)
const Memo = memo(ForwardRef)

export default Memo
