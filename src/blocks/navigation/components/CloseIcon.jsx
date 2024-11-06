export const CloseIcon = ({className}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            className={className ?? ""}
        >
            <path fill="currentColor" d="m13.79 10 5.687-5.686a1.787 1.787 0 0 0 0-2.527L18.213.523a1.787 1.787 0 0 0-2.527 0L10 6.21 4.314.523a1.787 1.787 0 0 0-2.527 0L.523 1.787a1.787 1.787 0 0 0 0 2.527L6.21 10 .523 15.686a1.787 1.787 0 0 0 0 2.527l1.264 1.264c.698.697 1.83.697 2.527 0L10 13.79l5.686 5.686c.698.697 1.83.697 2.527 0l1.264-1.264a1.787 1.787 0 0 0 0-2.527L13.79 10Z"/>
        </svg>
    );
}