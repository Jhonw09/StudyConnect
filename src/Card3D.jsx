import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Card3D() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setRotateX(-y / 15);
    setRotateY(x / 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      perspective: '1000px'
    }}>
      <motion.div
        style={{
          width: 350,
          height: 250,
          background: 'linear-gradient(145deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 20,
          boxShadow: isHovered 
            ? '0 25px 50px rgba(0,0,0,0.3), 0 0 30px rgba(102, 126, 234, 0.4)'
            : '0 15px 35px rgba(0,0,0,0.2)',
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {/* Brilho de fundo */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(255,255,255,0.1), transparent)',
            borderRadius: 20,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Conteúdo principal */}
        <div style={{
          padding: 40,
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          <motion.h2
            style={{
              fontSize: '2.5rem',
              marginBottom: 20,
              fontWeight: 'bold',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}
            animate={{
              y: isHovered ? -5 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            Bem-vindo!
          </motion.h2>
          
          <motion.p
            style={{
              fontSize: '1.2rem',
              opacity: 0.9,
              textShadow: '0 1px 5px rgba(0,0,0,0.3)'
            }}
            animate={{
              y: isHovered ? 5 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            Estude com a StudyConnect+
          </motion.p>
        </div>

        {/* Decorações 3D */}
        <motion.div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            fontSize: '2rem',
            transformStyle: 'preserve-3d'
          }}
          animate={{
            rotateZ: isHovered ? 360 : 0,
            scale: isHovered ? 1.2 : 1,
            translateZ: isHovered ? 30 : 0
          }}
          transition={{ duration: 0.6 }}
        >
          🌟
        </motion.div>
        
        <motion.div
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            fontSize: '2rem',
            transformStyle: 'preserve-3d'
          }}
          animate={{
            rotateZ: isHovered ? -360 : 0,
            scale: isHovered ? 1.2 : 1,
            translateZ: isHovered ? 30 : 0
          }}
          transition={{ duration: 0.6 }}
        >
          🚀
        </motion.div>
      </motion.div>
    </div>
  );
}
