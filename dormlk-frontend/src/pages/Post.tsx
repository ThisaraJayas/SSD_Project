import DefaulltHeader from '@/PageComponents/DefaulltHeader.tsx'
import Footer from '@/PageComponents/Footer.tsx'
import ListPostSteper from '@/PageComponents/ListPostSteper.tsx'
import React from 'react'

export default function Post() {
  return (
    <div>
        <DefaulltHeader/>
        {/* <ListPost/> */}
        <ListPostSteper/>
        
    </div>
  )
}
