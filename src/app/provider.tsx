"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "@/components/ui/color-mode"

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
// 'use client'

// import { CacheProvider } from '@chakra-ui/next-js'
// import { ChakraProvider } from '@chakra-ui/react'

// export function Providers({ children }: { children: React.ReactNode }) {
//     return (
//         <CacheProvider>
//             <ChakraProvider>
//                 {children}
//             </ChakraProvider>
//         </CacheProvider>
//     )
// }