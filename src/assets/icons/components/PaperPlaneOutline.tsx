import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgPaperPlaneOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <defs>
      <clipPath id={'paper-plane-outline_svg__a'}>
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
    <g clipPath={'url(#paper-plane-outline_svg__a)'}>
      <path
        d={
          'M21 3.99c-.02-.09-.04-.18-.06-.26v-.09a.9.9 0 0 0-.2-.3c-.09-.08-.19-.15-.29-.2h-.09a.9.9 0 0 0-.32-.15H20c-.1-.01-.21-.01-.3 0l-18.01 6c-.2.07-.37.2-.49.37-.13.17-.19.37-.19.59 0 .21.06.41.19.58.12.17.29.3.49.37l8.53 2.84 2.85 8.53c.06.2.19.37.36.49.17.13.37.19.59.19.21 0 .41-.06.58-.19.17-.12.3-.29.37-.49l6-18.01q.03-.12.03-.27m-4.71 2.29-5.56 5.58-5.58-1.87zM14 18.84l-1.86-5.57L17.7 7.7z'
        }
        fill={'#000'}
      />
    </g>
  </svg>
)
const ForwardRef = forwardRef(SvgPaperPlaneOutline)
const Memo = memo(ForwardRef)

export default Memo
