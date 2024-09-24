export const GestiniLogo = ({ color = '', height = '', width = '' }) => (
  <svg width={width == '' ? '15' : width} height={height == '' ? '29' : height} viewBox='0 0 18 29' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_741_5096)'>
      <path
        d='M0 13.0664V23.1103V26.0517C0 28.6711 3.30815 29.9825 5.24557 28.1323C5.24557 23.1239 5.24557 13.0495 5.24557 8.04443L0 13.0664Z'
        fill={color == '' ? 'var(--c-logo)' : color}
      />
      <path
        d='M6.37537 6.79785C6.37537 11.8029 6.37537 21.8773 6.37537 26.8823L11.6209 21.8637C11.6209 16.8553 11.6209 6.7809 11.6209 1.77588L6.37183 6.79785H6.37537Z'
        fill={color == '' ? 'var(--c-logo)' : color}
      />
      <path
        d='M12.7509 0.86727C12.7509 5.87229 12.7509 15.9467 12.7509 20.9518L17.9964 15.9332V5.88924V2.9479C17.9964 0.328476 14.6847 -0.986317 12.7473 0.86727H12.7509Z'
        fill={color == '' ? 'var(--c-logo)' : color}
      />
    </g>
    <defs>
      <clipPath id='clip0_741_5096'>
        <rect width='18' height='29' fill='white' />
      </clipPath>
    </defs>
  </svg>
)
