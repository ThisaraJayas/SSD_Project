import React from 'react'
import '../styles/footer.css'
import logo from '../styles/dorm1.png'

export default function Footer() {
  return (
    <div>
   
<footer className="bg-slate-700">
  <div className="mx-auto grid text-gray-50 lg:grid-cols-12">
    <div className="flex flex-col items-start border-r border-b border-slate-500 py-8 px-5 sm:flex-row sm:px-8 md:pt-14 lg:col-span-7 xl:pl-32 2xl:pl-40">
      <img className="w-40" src={logo} alt="" />
      <p className="pt-4 text-sm leading-6 tracking-wide sm:pl-10 sm:pt-0">
      Welcome to Dorm.lk, your reliable platform for finding the perfect living space. 
      Whether you're a student searching for a dorm or just looking for a new place to call home, 
      our website makes it simple and free for anyone to list properties. Explore a wide range 
      of options, connect with property owners directly, and find your ideal space with ease.
      </p>
    </div>
    <div className="px-5 py-8 sm:px-8 md:pt-14 lg:col-span-5 xl:pr-32 2xl:pr-40">
      <p className="font-medium text-emerald-100">Notification</p>
      <p className="mb-4 mt-4 text-2xl sm:mb-8 sm:text-5xl">Subscribe for Notifications</p>
      <div className="flex max-w-lg rounded-full bg-white ring-emerald-300 focus-within:ring">
        <input className="w-full rounded-full px-6 text-gray-600 outline-none md:px-10" type="email" placeholder="Enter your email" />
        <button className="rounded-full bg-emerald-500 p-2 ring-emerald-300 focus:ring active:scale-105 md:p-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
    <nav aria-label="Footer Navigation" className="flex flex-wrap border-t border-r border-slate-500 px-5 pb-10 sm:py-8 sm:px-8 lg:col-span-7 lg:border-t-0 xl:flex-nowrap xl:space-x-16 xl:pl-32 2xl:pl-40">
      <ul className="mt-8 mr-4 flex-grow space-y-3 whitespace-nowrap md:mt-0">
        <li><strong>Company</strong></li>
        <li><a href="#"> About </a></li>
        <li><a href="#"> How it works </a></li>
        <li><a href="#"> List with us </a></li>
        <li><a href="#"> Partner with us </a></li>

      </ul>
      <ul className="mt-8 mr-4 flex-grow space-y-3 whitespace-nowrap md:mt-0">
        <li><strong>Discover</strong></li>
        <li><a href=""> Blog </a></li>
        <li><a href=""> Newsroom </a></li>
        <li><a href=""> Media </a></li>
        <li><a href="#"> Univercities </a></li>

      </ul>
      <ul className="mt-8 mr-4 flex-grow space-y-3 whitespace-nowrap md:mt-0">
        <li><strong>Support</strong></li>
        <li><a href=""> Help center </a></li>
        <li><a href=""> Contact </a></li>
        <li><a href=""> Privacy policy </a></li>
        <li><a href=""> Chat </a></li>
      </ul>
    </nav>
    <div className="border-t border-slate-500 py-4 lg:col-span-12">
      <p className="text-center text-sm text-gray-400">Dormlk © 2024. All rights reserved.</p>
    </div>
  </div>
</footer>

    </div>
  )
}
