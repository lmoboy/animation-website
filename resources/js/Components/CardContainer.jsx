export default function CardContainer({ children, className = "" }) {
    return (
        <div
            className={
                "rounded-lg " +
                className
            }
        >
            {children}
        </div>
    );
}
