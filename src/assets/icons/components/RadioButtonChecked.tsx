import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgRadioButtonChecked = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <defs>
      <clipPath id={'radio_button_checked_svg__a'}>
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
    <g clipPath={'url(#radio_button_checked_svg__a)'}>
      <path
        d={
          'M12 7c-2.77 0-5 2.23-5 5 0 2.76 2.23 5 5 5 2.76 0 5-2.24 5-5 0-2.77-2.24-5-5-5m0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.43 0-8-3.58-8-8 0-4.43 3.57-8 8-8 4.42 0 8 3.57 8 8 0 4.42-3.58 8-8 8'
        }
        fill={'#000'}
      />
    </g>
  </svg>
)
const ForwardRef = forwardRef(SvgRadioButtonChecked)
const Memo = memo(ForwardRef)

export default Memo
