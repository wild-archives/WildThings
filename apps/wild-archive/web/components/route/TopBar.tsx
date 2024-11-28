"use client"
import { Menu as MenuIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import Menu from './Menu'

export default function TopBar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <div className="flex items-center h-14 px-4 border-b border-gray-200">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <MenuIcon size={24} />
        </Button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <Menu />
        </div>
      )}
    </div>
  )
}
