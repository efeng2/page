# Vanta-js in React
2025-03-30

Basic Implementation
 
Bash commands
```{bash}
npm install three vanta
```

Component Code
```{js}
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min";

export function Header() {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = GLOBE({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0xf4619c,
      color2: 0xffd4e8,
      size: 2,
      backgroundColor: 0x32153c,
      THREE: THREE,
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <header ref={vantaRef} className="bg-light py-5 position-relative">
      ...
    </header>
  )
}
```