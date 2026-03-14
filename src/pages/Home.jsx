import { motion } from 'framer-motion'
import HeroCarousel from "../components/HeroCarousel"
import AchievementsPage from "./Achievements"

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

function HomePage() {
  return (
    <motion.div
      className="mx-auto w-full mt-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <HeroCarousel /> 
      <AchievementsPage/>
    </motion.div>
  )
}

export default HomePage

