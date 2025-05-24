import React from "react";

const messages = [
  "Fii puternica",
  "Nu renunta",
  "Totul e posibil",
  "Crede in tine",
  "Ai curaj",
  "Zambeste",
  "Fa pasul",
  "Esti valoroasa",
  "Speranta noua azi",
  "Curaj pentru totdeauna",
  "Incredere în tine",
  "Lumina din suflet",
  "Visuri ce implinesc"
];

function BackgroundMessages() {
  const renderedMessages = Array.from({ length: 20 }).map((_, i) => {
    const msg = messages[Math.floor(Math.random() * messages.length)];
    const top = Math.random() * 90;
    const left = Math.random() * 90;
    const rotation = (Math.random() * 60) - 30;

    return (
      <span
        key={`msg-${i}`}
        style={{
          position: "absolute",
          top: `${top}%`,
          left: `${left}%`,
          transform: `rotate(${rotation}deg)`,
          fontSize: "1.2rem",
          color: "rgba(0,0,0,0.1)",
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        {msg}
      </span>
    );
  });

  
  const renderedHearts = Array.from({ length: 25 }).map((_, i) => {
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const rotation = Math.random() * 360;
    const size = 10 + Math.random() * 20;
    const hue = 340 - (340 * i) / 24; // i de la 0 la 24
    const color = `hsl(${hue}, 80%, 65%)`;

  
    const animationDelay = `${(i * 0.4) % 4}s`;

    return (
      <span
        key={`heart-${i}`}
        style={{
          position: "absolute",
          top: `${top}%`,
          left: `${left}%`,
          transform: `rotate(${rotation}deg)`,
          fontSize: `${size}px`,
          color: color,
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          zIndex: 0,
          animation: `pulse 3s ease-in-out infinite, floatUpDown 6s ease-in-out infinite, floatLeftRight 8s ease-in-out infinite`,
          animationDelay: `${animationDelay}, ${animationDelay}, ${animationDelay}`,
        }}
      >
        ❤️
      </span>
    );
  });

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.8;
            }
            50% {
              transform: scale(1.3);
              opacity: 1;
            }
          }

          @keyframes floatUpDown {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes floatLeftRight {
            0%, 100% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(10px);
            }
          }
        `}
      </style>

      <div
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {renderedMessages}
        {renderedHearts}
      </div>
    </>
  );
}

export default BackgroundMessages;
