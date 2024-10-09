import anime from "animejs";
import { useEffect } from "react";

export default function Waves() {

    useEffect(() => {
    anime({
        targets: ".mainWaves",
        easing: "easeInOutSine",
        opacity: [0, 1],
        translateY: [100, 0],
        delay: 1000,
        duration: 500,
    })
    anime({
        targets: [".backWave", ".frontWave"],
        easing: "easeInOutSine",
        translateX: [10,-10, 10],
        translateY: [10,-10, 10],
        delay: anime.stagger(1000),
        duration: 5000,
        direction: "alternate",
        loop: true,
    });
})

    return (
        <div className="mainWaves fixed left-0 bottom-0 w-full">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="backWave blur-md fixed -left-[2vw] bottom-0 z-0 w-[105vw]"
                viewBox="0 0 1440 320"
            >
                <path
                    fill="#a2d9fff0"
                    d="M0,288L48,266.7C96,245,192,203,288,154.7C384,107,480,53,576,64C672,75,768,149,864,160C960,171,1056,117,1152,117.3C1248,117,1344,171,1392,197.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="frontWave blur-md fixed -left-[2vw] bottom-0 z-0 w-[105vw]"
                viewBox="0 0 1440 320"
            >
                <path
                    fill="#0099fff0"
                    d="M0,192L48,202.7C96,213,192,235,288,250.7C384,267,480,277,576,245.3C672,213,768,139,864,138.7C960,139,1056,213,1152,224C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
            </svg>
        </div>
    );
}
