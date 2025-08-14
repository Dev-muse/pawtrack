 

import {ReactNode} from 'react'

function H1({children}:{children:ReactNode }) {
  return (
    <h1 className="font-medium leading-6 text-2xl">{children}</h1>
  )
}

export default H1