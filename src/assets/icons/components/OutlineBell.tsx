import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgOutlineBell = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    width={24.001}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <rect fill={'none'} height={23} rx={0} transform={'translate(.5 .5)'} width={23} />
    <path
      clipRule={'evenodd'}
      d={
        'm15.72 15.404 1.801 1.804a1.63 1.63 0 0 1 .352 1.783A1.63 1.63 0 0 1 16.363 20H13v.341C13 22.359 11.206 24 9 24s-4-1.641-4-3.659V20H1.637a1.63 1.63 0 0 1-1.512-1.01 1.63 1.63 0 0 1 .354-1.782l1.801-1.804.001-4.677c0-1.934.838-3.778 2.302-5.06A6.72 6.72 0 0 1 9.9 4.06c3.318.439 5.82 3.396 5.82 6.877zM3.695 16.818 2.515 18h12.971l-1.18-1.183a1.99 1.99 0 0 1-.586-1.413v-4.467c0-2.482-1.755-4.586-4.082-4.895a4.66 4.66 0 0 0-3.737 1.129 4.73 4.73 0 0 0-1.62 3.556v4.677c0 .534-.208 1.036-.586 1.414M11 20.341C11 21.24 10.084 22 9 22s-2-.76-2-1.659V20h4z'
      }
      fill={'#000'}
      fillRule={'evenodd'}
    />
    <circle cx={17.501} cy={6.5} fill={'#CC1439'} r={6.5} />
    <path
      d={
        'M20.08 8.77c0 1.21-1.09 2.1-2.57 2.1-1.47 0-2.52-.81-2.57-2h1.11c.05.65.66 1.05 1.45 1.05.85 0 1.47-.48 1.47-1.19 0-.73-.58-1.24-1.59-1.24h-.61V6.6h.61c.8 0 1.37-.47 1.37-1.17 0-.67-.49-1.12-1.23-1.12-.71 0-1.34.4-1.37 1.07h-1.06c.04-1.18 1.11-1.99 2.44-1.99 1.4 0 2.28.92 2.28 1.99 0 .81-.49 1.41-1.25 1.6v.06c.96.15 1.52.81 1.52 1.73'
      }
      fill={'#FFF'}
      fillRule={'evenodd'}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgOutlineBell)
const Memo = memo(ForwardRef)

export default Memo
