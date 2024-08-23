import React from 'react'
import { Themes } from './Themes'
import { Checkbox } from '@nextui-org/react'
import { capitalize } from '../AppTable/TableComponents/utils'

export const ChangeTheme = () => {
  const [theme, setTheme] = React.useState({} as any)

  React.useEffect(() => {
    const temaGuardado = localStorage.getItem('theme')
    if (!temaGuardado) {
      setTheme(Themes.light)
    } else {
      const nuevoTema = temaGuardado === 'light' ? Themes.light : Themes.night
      setTheme(nuevoTema)
    }
  }, [])

  const changeTheme = (newTheme: string) => {
    const nuevoTema = theme === Themes.light ? Themes.night : Themes.light
    if (newTheme == theme.name) return

    setTheme(nuevoTema)
    document.body.classList.remove(theme === Themes.light ? 'light' : 'dark')
    document.body.classList.add(nuevoTema === Themes.light ? 'light' : 'dark')
    localStorage.setItem('theme', nuevoTema.name)
  }

  const themes = Object.keys(Themes).map((key) => Themes[key].name)

  return (
    <div className='mt-3 flex flex-col gap-4'>
      <span className='font-medium text-c-title'>Tema</span>
      {themes.map((item, index) => (
        <Checkbox
          key={index}
          color='primary'
          classNames={{
            wrapper: 'after:bg-[var(--c-primary-variant-1)]',
          }}
          onChange={() => changeTheme(item)}
          isSelected={item === theme.name}
        >
          {capitalize(item)}
        </Checkbox>
      ))}
    </div>
  )
}
