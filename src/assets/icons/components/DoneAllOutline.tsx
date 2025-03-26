import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgDoneAllOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <defs>
      <clipPath id={'done-all-outline_svg__a'}>
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
    <g clipPath={'url(#done-all-outline_svg__a)'} fill={'#000'}>
      <path
        d={
          'M16.62 6.21a.9.9 0 0 0-.35-.18.9.9 0 0 0-.4-.03.85.85 0 0 0-.37.12c-.11.06-.21.15-.29.26l-7.01 9-3.42-4.18q-.135-.165-.3-.27c-.12-.07-.25-.11-.38-.13-.13-.01-.27 0-.4.03-.13.04-.25.1-.35.19-.1.08-.19.18-.25.3a.9.9 0 0 0-.12.38c-.01.13 0 .27.04.4.04.12.11.24.2.35l4.16 5.17c.1.12.22.21.35.28.14.06.29.1.43.1.16 0 .32-.03.47-.09.14-.07.27-.17.37-.29l7.83-10c.07-.11.13-.23.17-.36.03-.13.03-.26.02-.39a.9.9 0 0 0-.14-.37.9.9 0 0 0-.26-.29M21.62 6.21a.9.9 0 0 0-.35-.18.9.9 0 0 0-.4-.03.85.85 0 0 0-.37.12c-.11.06-.21.15-.3.26l-6.99 9-.61-.75-1.26 1.62 1.1 1.37c.09.11.21.2.34.27.14.06.29.1.44.1a1.1 1.1 0 0 0 .78-.38l7.83-10c.07-.11.13-.23.16-.36a1.03 1.03 0 0 0-.11-.76 1 1 0 0 0-.26-.28'
        }
      />
      <path
        d={
          'm8.7 13.06 1.3-1.62-.2-.24c-.08-.11-.18-.21-.3-.28a1 1 0 0 0-.78-.1c-.13.03-.25.09-.35.18a.94.94 0 0 0-.37.67c-.02.13 0 .26.03.39.04.13.1.24.19.35z'
        }
      />
    </g>
  </svg>
)
const ForwardRef = forwardRef(SvgDoneAllOutline)
const Memo = memo(ForwardRef)

export default Memo
