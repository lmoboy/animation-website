import { useEffect, useRef } from "react";
import anime from "animejs";

export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9333EA" />
                    <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
            </defs>

            {/* Outer Ring */}
            <circle 
                cx="50" 
                cy="50" 
                r="45"
                fill="none"
                stroke="url(#logoGradient)"
                strokeWidth="3"
            />

            {/* K Letter */}
            <path
                d="M35 30 L35 70 M35 50 L50 30 M35 50 L50 70"
                fill="none"
                stroke="url(#logoGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* A Letter */}
            <path
                d="M55 70 L65 30 L75 70 M58 55 L72 55"
                fill="none"
                stroke="url(#logoGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
