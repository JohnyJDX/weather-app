'use client'
import { Button } from '@/components/ui/button'
import { useGeolocation } from '@uidotdev/usehooks'
import { Locate } from 'lucide-react'
import { useRouter } from 'next/navigation'
import SearchDialog from './search-dialog'
import { ThemeToggle } from './theme-toggle'

const Header = () => {
  const { longitude, latitude } = useGeolocation()
  const router = useRouter()

  const handleCurrentLocationClick = () => {
    if (longitude && latitude) {
      router.push(`/?lat=${latitude}&lon=${longitude}`)
    }
  }

  return (
    <header className="border-b p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-end gap-2">
          <SearchDialog />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCurrentLocationClick}
          >
            <Locate />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
