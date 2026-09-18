import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, useProgress, Stars } from '@react-three/drei';
import ReplayIcon from './icons/ReplayIcon';

const MODEL_URL = '/models/valentinescene10.glb';

interface ScenePageProps {
  onReplay: () => void;
}

// Candlelight-coloured loading state, shown inside the canvas until the model is ready
function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[hsl(35_60%_75%/0.25)] border-t-[hsl(35_80%_78%)]" />
        <p className="font-serif-italic text-sm text-[hsl(35_60%_85%/0.75)]">
          setting things up... {Math.round(progress)}%
        </p>
      </div>
    </Html>
  );
}

function Scene(props: JSX.IntrinsicElements['group']) {
  const { scene } = useGLTF(MODEL_URL);
  return <primitive object={scene} {...props} />;
}

const ScenePage = ({ onReplay }: ScenePageProps) => {
  return (
    <motion.div
      className="relative h-screen w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2.5, ease: 'easeInOut' }}
    >
      <div className="h-full w-full bg-black">
        <Canvas>
          <ambientLight intensity={0.2} />
          <pointLight intensity={5} position={[0, 1, 0.9]} />

          <Stars radius={80} depth={40} count={7000} factor={3.5} saturation={0} fade speed={0.5} />
          <OrbitControls
            enableZoom
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minDistance={2}
            maxDistance={10}
          />
          {/* Must be INSIDE the Canvas: useGLTF suspends, and R3F's Canvas
              re-throws suspension to the nearest outer boundary otherwise,
              which would blank the whole page while the model downloads. */}
          <Suspense fallback={<Loader />}>
            <Scene position={[-2, -1, 1]} scale={2} />
          </Suspense>
        </Canvas>
      </div>

      {/* Subtle replay, tucked into the corner like another candle in the dark */}
      <motion.button
        className="group absolute bottom-6 right-6 flex items-center gap-2 text-[hsl(35_55%_82%)] opacity-35 transition-opacity duration-500 hover:opacity-90"
        onClick={onReplay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 4, duration: 1.5 }}
        whileHover={{ scale: 1.04 }}
      >
        <ReplayIcon size={16} color="currentColor" />
        <span className="font-serif-italic text-sm">start over</span>
      </motion.button>
    </motion.div>
  );
};

// Called from the closing page so the 27MB model downloads during the countdown
export const preloadScene = () => useGLTF.preload(MODEL_URL);

export default ScenePage;
