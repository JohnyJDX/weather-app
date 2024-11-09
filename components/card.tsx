'use client'
import React from 'react'
import { useTheme } from 'next-themes'
import { MagicCard } from '@/components/ui/magic-card'
import { cn } from '@/lib/utils'

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const { theme } = useTheme()
  return (
    <MagicCard
      className={
        (cn(
          'cursor-pointer flex-col items-center justify-center whitespace-nowrap text-4xl shadow-2xl',
        ),
        className)
      }
      gradientColor={theme === 'dark' ? '#383838' : '#6e6e6e52'}
    >
      {children}
    </MagicCard>
  )
}

export default Card
