import anime from "animejs";
import { useEffect } from "react";

export default function CardContainer({ children, className = "" }) {
    useEffect(() => {
        anime({
            targets: ".cardContainer",
            easing: "easeInOutQuad",
            opacity: [0, 1],
            translateX: [-100,0],
            duration: 1500,
            delay: 1500,
        })
    },[])

    return (
        <div
            className={
                "cardContainer rounded-lg backdrop-blur-lg " +
                className
            }
        >
            {children}
        </div>
    );
}
