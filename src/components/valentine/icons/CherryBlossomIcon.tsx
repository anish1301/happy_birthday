import { motion } from 'framer-motion';

interface CherryBlossomIconProps {
  size?: number;
  color?: string;
  className?: string;
  delay?: number;
}

const CherryBlossomIcon = ({ size = 120, color = 'hsl(330, 80%, 75%)', className = '', delay = 0 }: CherryBlossomIconProps) => {
  return (
    <motion.svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 80 120"
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay }}
    >
      {/* Branch */}
      <motion.path
        d="M20 120 Q30 90 40 60 Q50 30 60 10"
        stroke="hsl(30, 30%, 30%)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: delay + 0.3 }}
      />
      <motion.path
        d="M40 60 Q30 50 15 45"
        stroke="hsl(30, 30%, 30%)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: delay + 0.8 }}
      />

      {/* Blossom 1 (Center) */}
      <motion.g
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: delay + 1.2, type: "spring", stiffness: 100 }}
        style={{ transformOrigin: '40px 60px' }}
      >
        <path d="M40 60 C30 45 40 35 40 35 C40 35 50 45 40 60" fill={color} opacity={0.9} />
        <path d="M40 60 C55 55 60 45 60 45 C60 45 55 65 40 60" fill={color} opacity={0.9} />
        <path d="M40 60 C50 75 40 85 40 85 C40 85 30 75 40 60" fill={color} opacity={0.9} />
        <path d="M40 60 C25 65 20 75 20 75 C20 75 25 55 40 60" fill={color} opacity={0.9} />
        <circle cx="40" cy="60" r="4" fill="hsl(330, 60%, 50%)" />
      </motion.g>

      {/* Blossom 2 (Top Right) */}
      <motion.g
        initial={{ scale: 0, rotate: 30 }}
        animate={{ scale: 0.7, rotate: 15 }}
        transition={{ duration: 0.8, delay: delay + 1.5, type: "spring", stiffness: 100 }}
        style={{ transformOrigin: '55px 25px' }}
      >
        <path d="M55 25 C45 10 55 0 55 0 C55 0 65 10 55 25" fill={color} opacity={0.9} />
        <path d="M55 25 C70 20 75 10 75 10 C75 10 70 30 55 25" fill={color} opacity={0.9} />
        <path d="M55 25 C65 40 55 50 55 50 C55 50 45 40 55 25" fill={color} opacity={0.9} />
        <path d="M55 25 C40 30 35 40 35 40 C35 40 40 20 55 25" fill={color} opacity={0.9} />
        <circle cx="55" cy="25" r="4" fill="hsl(330, 60%, 50%)" />
      </motion.g>

      {/* Blossom 3 (Left Branch) */}
      <motion.g
        initial={{ scale: 0, rotate: -60 }}
        animate={{ scale: 0.6, rotate: -45 }}
        transition={{ duration: 0.8, delay: delay + 1.8, type: "spring", stiffness: 100 }}
        style={{ transformOrigin: '20px 48px' }}
      >
        <path d="M20 48 C10 33 20 23 20 23 C20 23 30 33 20 48" fill={color} opacity={0.9} />
        <path d="M20 48 C35 43 40 33 40 33 C40 33 35 53 20 48" fill={color} opacity={0.9} />
        <path d="M20 48 C30 63 20 73 20 73 C20 73 10 63 20 48" fill={color} opacity={0.9} />
        <path d="M20 48 C5 53 0 63 0 63 C0 63 5 43 20 48" fill={color} opacity={0.9} />
        <circle cx="20" cy="48" r="4" fill="hsl(330, 60%, 50%)" />
      </motion.g>

      {/* Falling Petal 1 */}
      <motion.path
        d="M30 65 C25 70 30 75 35 70 C35 65 30 65 30 65"
        fill={color}
        opacity={0.8}
        initial={{ y: -10, x: -5, opacity: 0, rotate: 0 }}
        animate={{ 
          y: [0, 40], 
          x: [-5, 5, -10],
          opacity: [0, 1, 0],
          rotate: [0, 45, 90]
        }}
        transition={{ duration: 4, delay: delay + 2.5, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Falling Petal 2 */}
      <motion.path
        d="M50 40 C45 45 50 50 55 45 C55 40 50 40 50 40"
        fill={color}
        opacity={0.7}
        initial={{ y: -5, x: 5, opacity: 0, rotate: 0 }}
        animate={{ 
          y: [0, 50], 
          x: [5, -5, 10],
          opacity: [0, 1, 0],
          rotate: [0, -45, -90]
        }}
        transition={{ duration: 5, delay: delay + 3, repeat: Infinity, ease: "linear" }}
      />
    </motion.svg>
  );
};

export default CherryBlossomIcon;
