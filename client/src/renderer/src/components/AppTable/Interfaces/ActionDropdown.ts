import { ReactNode } from "react"

export interface DropdownItemInteface {
  key: string
  title: string
  onPress: (args?: any) => Promise<void> | any
  startContent?: ReactNode | undefined
}