import { forwardRef, memo, SVGProps } from "react";

export const SvgArrowBackOutline = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>((props, ref) => (
  <svg
    fill="none"
    height={24}
    ref={ref}
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <clipPath id="arrow-back-outline_svg__a">
        <rect
          fill="#fff"
          fillOpacity={0}
          height={23}
          rx={0}
          transform="translate(.5 .5)"
          width={23}
        />
      </clipPath>
    </defs>
    <rect
      fill="none"
      height={23}
      rx={0}
      transform="translate(.5 .5)"
      width={23}
    />
    <g clipPath="url(#arrow-back-outline_svg__a)">
      <path
        d="M19 11H7.14l3.63-4.36c.16-.21.25-.47.22-.74a.96.96 0 0 0-.35-.67A1 1 0 0 0 9.9 5c-.26.02-.51.15-.67.36l-5 6q-.06.06-.09.15c0 .05 0 .08-.07.13-.05.11-.07.23-.07.36 0 .12.02.24.07.36 0 .05 0 .08.07.13q.03.075.09.15l5 6A1.043 1.043 0 0 0 10 19c.23 0 .46-.09.64-.23.1-.09.18-.19.24-.31.06-.11.1-.24.11-.37a1.02 1.02 0 0 0-.22-.73L7.14 13H19c.26 0 .51-.11.7-.3s.3-.44.3-.7a1 1 0 0 0-.3-.71.98.98 0 0 0-.7-.29"
        fill="currentColor"
      />
    </g>
  </svg>
));

SvgArrowBackOutline.displayName = 'SvgArrowBackOutline';

export default memo(SvgArrowBackOutline);
