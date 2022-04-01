import { Avatar } from './avatar'
import { ButtonLink } from './button-link'
import { Footer } from './footer'
import { IconButton } from './icon-button'
import { Logo, SearchIcon } from './icons'
import {
  Menu,
  MenuButton,
  MenuItemButton,
  MenuItemLink,
  MenuItems,
  MenuItemsContent,
} from './menu'
// import { SearchDialog } from './search-dialog'
import { capitalize } from '../lib/text'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import * as React from 'react'


export default function Layout({ children }) {
  const { data: session } = useSession()
  const { theme, themes, setTheme } = useTheme()
  const [isSearchDialogOpen, setIsSearchDialogOpen] = React.useState(false)

  return (
    <div className="max-w-3xl px-6 mx-auto">
      <header className="flex items-center justify-between gap-4 py-12 md:py-20">
        <Link href="/">
          <a>
            <h2>Dique Beam Clone ✨ </h2>
          </a>
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <IconButton
            variant="secondary"
            onClick={() => {
              setIsSearchDialogOpen(true)
            }}
          >
            <SearchIcon className="w-4 h-4" />
          </IconButton>

          <Menu>
            <MenuButton className="relative inline-flex rounded-full group focus-ring">
              <Avatar
                name={session?.user.name}
                src={session?.user.image}
                size="sm"
              />
            </MenuButton>

            <MenuItems className="w-48">
              <MenuItemsContent>
                <MenuItemLink href={`/profile/${session?.user.id}`}>
                  Profile
                </MenuItemLink>
                {/* <MenuItemButton onClick={() => signOut()}>
                  Log out
                </MenuItemButton> */}
                <MenuItemButton onClick={() => signOut()}>
                  Log out
                </MenuItemButton>
              </MenuItemsContent>
              <div className="flex items-center gap-4 px-4 py-3 rounded-b bg-secondary">
                <label htmlFor="theme" className="text-sm">
                  Theme
                </label>
                <select
                  id="theme"
                  name="theme"
                  value={theme}
                  onChange={(event) => {
                    setTheme(event.target.value)
                  }}
                  className="block w-full py-1.5 text-xs border rounded shadow-sm bg-primary border-secondary"
                >
                  {themes.map((theme) => (
                    <option key={theme} value={theme}>
                      {capitalize(theme)}
                    </option>
                  ))}
                </select>
              </div>
            </MenuItems>
          </Menu>

          <ButtonLink href="/new">
            <span className="sm:hidden">Post</span>
            <span className="hidden sm:block shrink-0">New post</span>
          </ButtonLink>
        </div>
      </header>

      <main>{children}</main>

      <div className="py-20">
        <Footer />
      </div>

      {/* <SearchDialog
        isOpen={isSearchDialogOpen}
        onClose={() => {
          setIsSearchDialogOpen(false)
        }}
      /> */}
    </div>
  )
}
