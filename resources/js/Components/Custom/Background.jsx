import anime from "animejs";
import { useEffect } from "react";

export default function Background() {

    useEffect(() => {
        anime({
            targets: ".mainCubes",
            opacity: [0,1],
            delay: 1200,
            easing: "easeInOutSine",
            duration: 5000,
        })
        anime({
            targets: ".cube",
            translateY: anime.random(-20, 20),
            loop: true,
            direction: "alternate",
            easing: "easeInOutSine",
            duration: 1000,
            delay: anime.stagger(200, {grid: [14, 5], from: 'center'}),
        })
    },[])

    return (
        <div className="mainCubes fixed inset-0  bg-opacity-75">
            {Array.from({ length: 10 }).map((_, i) => {
                const size = Math.floor(Math.random() * 100) + 3;
                const x = Math.floor(Math.random() * 100);
                const y = Math.floor(Math.random() * 100);
                return (
                    <div
                    className="cube absolute rounded-md blur-xs bg-linear-to-br from-teal-700 to-sky-500"
                        key={i}
                        style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            width: `${size}px`,
                            height: `${size}px`,
                        }}
                    />
                );
            })}
        </div>
    );
}
