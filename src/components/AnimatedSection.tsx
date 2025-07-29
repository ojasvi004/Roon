'use client';

import { motion, easeOut } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animationType?: 'scroll' | 'immediate';
  delay?: number;
  id?: string;
}

const AnimatedSection = ({
  children,
  className = '',
  animationType = 'scroll',
  delay = 0,
  id,
}: AnimatedSectionProps) => {
  const scrollVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
        delay,
      },
    },
  };

  const immediateVariants = {
    hidden: {
      opacity: 0,
      y: animationType === 'immediate' && delay === 0 ? -20 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: animationType === 'immediate' && delay === 0 ? 0.6 : 0.8,
        ease: easeOut,
        delay,
      },
    },
  };

  const variants =
    animationType === 'scroll' ? scrollVariants : immediateVariants;

  if (animationType === 'scroll') {
    return (
      <motion.div
        id={id}
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={variants}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
