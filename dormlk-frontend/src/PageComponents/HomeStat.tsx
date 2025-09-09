import React from 'react'
import { BedDouble } from 'lucide-react';import '../styles/homestat.css'
import { MdSupportAgent } from "react-icons/md";
import { TfiLocationPin } from "react-icons/tfi";
import { BiSupport } from "react-icons/bi";
import { BsHouseHeart } from "react-icons/bs";
import { LuBedDouble } from "react-icons/lu";

export default function HomeStat() {
  return (
    <section className="relative overflow-hidden bg-gray-100 py-12 sm:py-16 lg:py-10">
    <div className="mx-auto px-8 sm:px-12 lg:px-16">
      <div className="mx-auto mt-2 grid max-w-screen-xl grid-cols-1 gap-x-8 gap-y-12 text-center sm:text-left md:grid-cols-2 lg:grid-cols-4">
        <div className="backdrop-blur-lg relative mb-3 w-full rounded-3xl border bg-white/70 px-6 py-4 text-left shadow">
          <p className="relative">
          <LuBedDouble style={{ color: '#90928b', fontSize: '80px' }} />
          </p>
          <p className="relative text-2xl font-black text-gray-700">100+ Beds</p>
          <p className="relative mt-3 mb-2 text-gray-600">Book your perfect place from an extensive list of options.</p>
        </div>
  
        <div className="backdrop-blur-lg relative mb-3 w-full rounded-3xl border bg-white/70 px-6 py-4 text-left shadow">
          <p className="relative">
          <BsHouseHeart style={{ color: '#90928b', fontSize: '80px' }} />
          </p>
          <p className="relative text-2xl font-black text-gray-700">Find your Place</p>
          <p className="relative mt-3 mb-2 text-gray-600">Book your perfect place from an extensive list of options.</p>
        </div>
        
        <div className="backdrop-blur-lg relative mb-3 w-full rounded-3xl border bg-white/70 px-6 py-4 text-left shadow">
          <p className="relative">
          <TfiLocationPin style={{strokeWidth:'0', color: '#90928b', fontSize: '80px' }} />
          </p>
          <p className="relative text-2xl font-black text-gray-700">Post your Place</p>
          <p className="relative mt-3 mb-2 text-gray-600">Book your perfect place from an extensive list of options.</p>
        </div>


        <div className="backdrop-blur-lg relative mb-3 w-full rounded-3xl border bg-white/70 px-6 py-4 text-left shadow">
          <p className="relative">
          <BiSupport style={{ strokeWidth:'0', color: '#90928b', fontSize: '80px' }} />
          </p>
          <p className="relative text-2xl font-black text-gray-700">24/7 Support</p>
          <p className="relative mt-3 mb-2 text-gray-600">Book your perfect place from an extensive list of options.</p>
        </div>
  
      </div>
    </div>
  </section>
  
  
  

  )
}
