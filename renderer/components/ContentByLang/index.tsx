import { FC } from 'react'
import { IContentByLangProps } from './types'

const ContentByLang: FC<IContentByLangProps> = ({ lang, children }) => {
  switch (lang) {
    case 'grc':
      return <div className="font-greek text-2xl">{children}</div>
    case 'iw':
      return (
        <div className="font-hebrew text-4xl" dir="rtl">
          {children}
        </div>
      )
    default:
      return <div className="font-sans text-lg">{children}</div>
  }
}

export default ContentByLang
