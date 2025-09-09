import Footer from '@/PageComponents/Footer.tsx'
import HomeBanner from '@/PageComponents/HomeBanner.tsx'
import HomeHeader from '@/PageComponents/HomeHeader.tsx'
import HomeHeaderTabs from '@/PageComponents/HomeHeaderTabs.tsx'
import HomeItems from '@/PageComponents/HomeItems.tsx'
import HomeStat from '@/PageComponents/HomeStat.tsx'
import HomeTestimonial from '@/PageComponents/HomeTestimonial.tsx'
import HomeTitle from '@/PageComponents/HomeTitle.tsx'
import React from 'react'


export default function Home() {
  return (
    <div>
         <div className="homeContainer"> {/* This div has the background image */}
      <HomeHeader />
      
      {/* Other content can go here */}
    </div>
    
    <HomeStat/>
    <HomeHeaderTabs/>
    <HomeTitle/>
        <HomeItems/>
        <HomeTestimonial/>
        <HomeBanner/>
        <Footer/>
    </div>
  )
}
