import React from 'react'
import { Themes } from './Themes'
import { Checkbox } from '@nextui-org/react'

export const ChangeTheme: React.FC = () => {
  const [theme, setTheme] = React.useState(Themes.light)
  const [selected, setSelected] = React.useState(0)

  React.useEffect(() => {
    const temaGuardado = localStorage.getItem('theme')
    if (temaGuardado) {
      const nuevoTema = temaGuardado === 'light' ? Themes.light : Themes.night
      setTheme(nuevoTema)
      setSelected(nuevoTema.name === 'light' ? 0 : 1)
      document.body.classList.add(nuevoTema.name)
    } else {
      document.body.classList.add('light')
    }
  }, [])

  const changeTheme = (n: number) => {
    if ((n === 0 && theme.name === 'light') || (n === 1 && theme.name === 'night')) {
      // No hacer nada si se selecciona el tema actual
      return
    }

    const nuevoTema = n === 0 ? Themes.light : Themes.night
    document.body.classList.remove(theme.name)
    document.body.classList.add(nuevoTema.name)
    localStorage.setItem('theme', nuevoTema.name)
    setSelected(n)
    setTheme(nuevoTema)
  }

  return (
    <>
      <Checkbox
        className='block mt-2'
        onChange={() => changeTheme(0)}
        isSelected={selected === 0}
        color="primary"
      >
        Light
      </Checkbox>
      <Checkbox
        className='block mb-2'
        onChange={() => changeTheme(1)}
        isSelected={selected === 1}
        color="default"
      >
        Dark
      </Checkbox>
    </>
  )
}
