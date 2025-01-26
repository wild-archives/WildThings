'use client';

import { useState } from 'react';
import { Menu as MenuIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'motion/react';

const SIDEBAR_WIDTH = 375;
const HEADER_HEIGHT = 64;

interface LayoutWrapperProps {
  left: React.ReactNode;
  right: React.ReactNode;
  main: React.ReactNode;
}

const Header = () => (
  <section id="header" className="p-4 pl-16 border-b border-gray-200">
    <h1 className="text-2xl font-bold">Wild Archive</h1>
  </section>
);

const MobileHeader = () => (
  <section id="header" className="p-4">
    <h1 className="text-2xl font-bold">Wild Archive</h1>
  </section>
);

export default function LayoutWrapper({
  left,
  right,
  main,
}: LayoutWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen w-full relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 p-2 hover:bg-gray-100 hover:text-primary rounded-lg z-20"
      >
        <MenuIcon size={24} />
      </Button>

      {/* Mobile Top Header */}
      <motion.div
        className="absolute top-0 left-0 w-screen flex justify-center"
        initial={false}
        animate={{ y: isOpen ? 0 : -HEADER_HEIGHT }}
      >
        <MobileHeader />
      </motion.div>

      {/* Desktop Sidebar */}
      <motion.div
        className="hidden lg:block lg:fixed lg:left-0 w-min flex-shrink-0 overflow-hidden bg-white z-10 border-r border-gray-200"
        initial={false}
        animate={{ x: isOpen ? -SIDEBAR_WIDTH : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <motion.div
          className="w-[375px]"
          initial={false}
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.1, ease: 'easeInOut' }}
        >
          <Header />
          <div>{left}</div>
        </motion.div>
      </motion.div>

      {/* Mobile Sidebar */}
      <motion.div
        className="lg:hidden fixed lg:left-0 w-screen flex-shrink-0 overflow-hidden bg-white z-10 border-r border-gray-200"
        initial={false}
        animate={{ x: !isOpen ? '-100vw' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <motion.div
          className="w-[375px]"
          initial={false}
          animate={{ opacity: !isOpen ? 0 : 1 }}
          transition={{ duration: 0.1, ease: 'easeInOut' }}
        >
          <Header />
          <div>{left}</div>
        </motion.div>
      </motion.div>

      {/* Desktop Main Content */}
      <div
        className={`hidden md:flex flex-col flex-grow transition-all duration-500 min-w-0 ${
          !isOpen ? 'lg:pl-[375px]' : ''
        }`}
      >
        <motion.div
          className="flex-grow"
          initial={false}
          animate={{ paddingTop: !isOpen ? 0 : HEADER_HEIGHT }}
        >
          {main}
        </motion.div>
        <div className="md:hidden">{right}</div>
      </div>

      {/* Mobile Main Content */}
      <div
        className={`flex md:hidden flex-col flex-grow transition-all duration-500 min-w-0 ${
          isOpen ? 'lg:pl-[375px]' : ''
        }`}
      >
        <div className="flex-grow pt-[64px]">{main}</div>
        <div className="md:hidden">{right}</div>
      </div>

      {/* Desktop Right Sidebar */}
      <div className="hidden md:block min-w-min flex-shrink-0 border-l border-gray-200">
        {right}
      </div>
    </div>
  );
}
