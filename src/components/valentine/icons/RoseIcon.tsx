import { motion } from 'framer-motion';

interface RoseIconProps {
  size?: number;
  color?: string;
  className?: string;
  delay?: number;
}

const RoseIcon = ({ size = 120, color = 'hsl(350, 75%, 55%)', className = '', delay = 0 }: RoseIconProps) => {
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
      {/* Stem */}
      <motion.path
        d="M40 120 Q38 100 39 80 Q40 70 40 60"
        stroke="hsl(145, 40%, 45%)"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: delay + 0.3 }}
      />

      {/* Left leaf */}
      <motion.path
        d="M39 95 Q24 88 18 74 Q32 80 39 88"
        fill="hsl(145, 45%, 50%)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.8 }}
        style={{ transformOrigin: '39px 92px' }}
      />

      {/* Right leaf */}
      <motion.path
        d="M40 85 Q56 78 62 64 Q48 70 40 80"
        fill="hsl(145, 45%, 50%)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: delay + 1 }}
        style={{ transformOrigin: '40px 82px' }}
      />

      {/* Small thorn left */}
      <motion.path
        d="M39 90 L35 87 L39 88"
        fill="hsl(145, 35%, 40%)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 1.1 }}
      />

      {/* Small thorn right */}
      <motion.path
        d="M40 82 L44 79 L40 80"
        fill="hsl(145, 35%, 40%)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 1.2 }}
      />

      {/* Rose bloom */}
      <motion.g
        initial={{ scale: 0, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 1, delay: delay + 1.2, type: "spring", stiffness: 100 }}
        style={{ transformOrigin: '40px 42px' }}
      >
        {/* Outer petals - back layer */}
        <motion.path
          d="M20 38 Q15 20 30 12 Q36 28 40 38 Q44 28 50 12 Q65 20 60 38 Q55 50 40 55 Q25 50 20 38"
          fill={color}
          opacity={0.7}
          animate={{
            d: [
              "M20 38 Q15 20 30 12 Q36 28 40 38 Q44 28 50 12 Q65 20 60 38 Q55 50 40 55 Q25 50 20 38",
              "M18 39 Q13 19 29 10 Q35 27 40 38 Q45 27 51 10 Q67 19 62 39 Q56 51 40 56 Q24 51 18 39",
              "M20 38 Q15 20 30 12 Q36 28 40 38 Q44 28 50 12 Q65 20 60 38 Q55 50 40 55 Q25 50 20 38",
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Middle petals */}
        <motion.path
          d="M25 40 Q22 28 32 18 Q37 30 40 40 Q43 30 48 18 Q58 28 55 40 Q50 48 40 52 Q30 48 25 40"
          fill={color}
          opacity={0.85}
          animate={{
            d: [
              "M25 40 Q22 28 32 18 Q37 30 40 40 Q43 30 48 18 Q58 28 55 40 Q50 48 40 52 Q30 48 25 40",
              "M24 41 Q21 27 31 16 Q36 29 40 40 Q44 29 49 16 Q59 27 56 41 Q51 49 40 53 Q29 49 24 41",
              "M25 40 Q22 28 32 18 Q37 30 40 40 Q43 30 48 18 Q58 28 55 40 Q50 48 40 52 Q30 48 25 40",
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />

        {/* Inner spiral petals */}
        <motion.path
          d="M30 40 Q28 32 35 24 Q38 33 40 40 Q42 33 45 24 Q52 32 50 40 Q46 46 40 48 Q34 46 30 40"
          fill={color}
          opacity={0.95}
          animate={{
            d: [
              "M30 40 Q28 32 35 24 Q38 33 40 40 Q42 33 45 24 Q52 32 50 40 Q46 46 40 48 Q34 46 30 40",
              "M29 41 Q27 31 34 22 Q37 32 40 40 Q43 32 46 22 Q53 31 51 41 Q47 47 40 49 Q33 47 29 41",
              "M30 40 Q28 32 35 24 Q38 33 40 40 Q42 33 45 24 Q52 32 50 40 Q46 46 40 48 Q34 46 30 40",
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />

        {/* Center bud - tight spiral */}
        <motion.ellipse
          cx="40"
          cy="38"
          rx="6"
          ry="8"
          fill={color}
          animate={{
            ry: [8, 9, 8],
            rx: [6, 7, 6],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Center highlight */}
        <motion.ellipse
          cx="40"
          cy="36"
          rx="3"
          ry="4"
          fill="hsla(350, 75%, 70%, 0.6)"
          animate={{
            ry: [4, 5, 4],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </motion.g>
    </motion.svg>
  );
};

export default RoseIcon;
