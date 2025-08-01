export const ExpandIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 25 25"
    height="25"
    width="25"
    className={className}
  >
    <path
      fill="#007B87"
      d="M9.9656 13.8961L1.53828 22.3242L1.5625 17.1875C1.5625 16.7563 1.2125 16.4062 0.78125 16.4062C0.35 16.4062 0 16.7563 0 17.1875V24.2188C0 24.45 0.0953023 24.6367 0.246855 24.7648C0.388276 24.9094 0.585172 25 0.803922 25H7.8125C8.24375 25 8.59375 24.65 8.59375 24.2188C8.59375 23.7875 8.24375 23.4375 7.8125 23.4375H2.63358L11.0703 15.0016L9.9656 13.8961ZM24.7531 0.235172C24.6117 0.0906454 24.4149 0 24.1969 0H17.1875C16.7563 0 16.4062 0.35 16.4062 0.78125C16.4062 1.2125 16.7563 1.5625 17.1875 1.5625H22.3656L13.9297 9.99922L15.0344 11.1039L23.4625 2.67578L23.4375 7.8125C23.4375 8.24375 23.7875 8.59375 24.2188 8.59375C24.65 8.59375 25 8.24375 25 7.8125V0.78125C25 0.55 24.9047 0.363317 24.7531 0.235172Z"
    />
  </svg>
)

export const CollapseIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 38 38"
    height="38"
    width="38"
    className={className}
  >
    <rect fill="white" height="38" width="38" />
    <path
      fill="#007B87"
      d="M16.1656 21.0513H9.22621C8.79871 21.0513 8.45249 21.396 8.45249 21.822C8.45249 22.2471 8.79871 22.5925 9.22621 22.5925H14.3532L6 30.9104L7.09414 32L15.4387 23.6898L15.4144 28.7542C15.4144 29.1794 15.7607 29.5248 16.1882 29.5248C16.6157 29.5248 16.9619 29.1801 16.9619 28.7542V21.8211C16.9619 21.5929 16.8673 21.4084 16.7173 21.2818C16.5758 21.1412 16.3812 21.0513 16.1656 21.0513ZM27.8059 16.4074H22.6789L31.0312 8.08947L29.9371 7L21.5933 15.3101L21.6176 10.2457C21.6176 9.82056 21.2714 9.47511 20.8439 9.47511C20.4164 9.47511 20.0701 9.81978 20.0701 10.2457V17.1788C20.0701 17.407 20.1647 17.5914 20.3139 17.7173C20.4546 17.8596 20.6485 17.9494 20.865 17.9494H27.8043C28.2318 17.9494 28.578 17.6047 28.578 17.1788C28.5788 16.7529 28.2325 16.4074 27.8059 16.4074Z"
    />
  </svg>
)

export const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    height="20"
    width="20"
  >
    <path
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-width="2"
      stroke="#007B87"
      d="M4.16667 10H15.8333"
    />
    <path
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-width="2"
      stroke="#007B87"
      d="M10 4.16666L15.8333 10L10 15.8333"
    />
  </svg>
)

export const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    height="20"
    width="20"
  >
    <path
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-width="2"
      stroke="#007B87"
      d="M15.8333 10H4.16667"
    />
    <path
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-width="2"
      stroke="#007B87"
      d="M10 15.8333L4.16667 10L10 4.16666"
    />
  </svg>
)
