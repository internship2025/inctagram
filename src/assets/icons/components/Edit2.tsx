import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgEdit2 = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <defs>
      <clipPath id={'edit-2_svg__a'}>
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
    <g clipPath={'url(#edit-2_svg__a)'} fill={'#000'}>
      <path
        d={
          'M19 20H5a.99.99 0 0 0-1 1c0 .26.1.51.29.7A1 1 0 0 0 5 22h14c.26 0 .51-.11.7-.3s.3-.44.3-.7a1 1 0 0 0-.3-.71.98.98 0 0 0-.7-.29M4.99 18h.1l4.16-.38c.46-.05.89-.25 1.22-.58l8.99-9c.35-.36.54-.86.53-1.36-.01-.51-.23-.99-.59-1.35l-2.74-2.74a2.08 2.08 0 0 0-1.32-.54c-.49-.01-.97.16-1.34.47l-9.01 9.01c-.32.32-.52.75-.57 1.21l-.43 4.17c-.01.14.01.29.06.43s.13.26.23.36.21.17.33.22.25.08.38.08M15.27 3.99 18 6.72l-2 1.95-2.68-2.68z'
        }
      />
    </g>
  </svg>
)
const ForwardRef = forwardRef(SvgEdit2)
const Memo = memo(ForwardRef)

export default Memo
