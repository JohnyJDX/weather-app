'use client'

import { cn } from '@/lib/utils'
import DotPattern from './ui/dot-pattern'

interface Props {
  children: React.ReactNode
}

export function DotPatternLinearGradient({ children }: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden rounded-lg border bg-background md:shadow-xl">
      {children}
      <DotPattern
        width={20}
        height={20}
        cx={10}
        cy={14}
        cr={1}
        className={cn(
          '[mask-image:radial-gradient(50vw_circle_at_center,white,transparent)]',
        )}
      />
    </div>
  )
}
