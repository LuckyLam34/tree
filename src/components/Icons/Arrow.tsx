export const Arrow = ({
  fill = '#828282',
  width = '20',
  height = '20',
}: {
  fill?: string;
  width?: string;
  height?: string;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.58032 0.599976L5.04999 0.599975L0.519658 0.599975C0.226765 0.892868 0.226765 1.36774 0.519658 1.66064L4.51966 5.66064C4.81255 5.95353 5.28742 5.95353 5.58032 5.66064L9.58032 1.66064C9.87321 1.36774 9.87321 0.892869 9.58032 0.599976Z"
      fill={fill}
    />
  </svg>
);
