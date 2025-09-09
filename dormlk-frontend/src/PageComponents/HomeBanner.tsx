import React from 'react'
import blog1 from '../styles/blog1.jpg'
import blog2 from '../styles/blog2.jpg'
import blog3 from '../styles/blog3.jpg'


export default function HomeBanner() {
  return (
    <section className="py-20">
  <h1 className="mb-12 text-center font-sans text-5xl font-bold">Recent Blogs</h1>
  <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
    
    <article className="h-90 col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2">
      <a href="https://vocal.media/journal/tips-to-find-property-value" target="_blank" rel="noopener noreferrer" className="block h-full w-full">
        <img className="max-h-40 w-full object-cover" alt="featured image" src={blog1} />
        <div className="w-full bg-white p-4">
          <p className="text-md font-medium text-indigo-500">Tips</p>
          <p className="mb-2 text-xl font-medium text-gray-800">Tips To Find Property Value</p>
          <p className="text-md font-light text-gray-400">For those wondering how to find value a property, there are many ways to do so</p>
          <div className="justify-starts mt-4 flex flex-wrap items-center">
            <div className="mr-2 mt-1 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">#tips</div>
            <div className="mr-2 mt-1 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">#property</div>
          </div>
        </div>
      </a>
    </article>
    <article className="h-90 col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2">
      <a href="https://vocal.media/art/real-estate-photo-editing-a-12-step-guide-to-stunning-property-images" target="_blank" rel="noopener noreferrer" className="block h-full w-full">
        <img className="max-h-40 w-full object-cover" alt="featured image" src={blog3} />
        <div className="w-full bg-white p-4">
          <p className="text-md font-medium text-indigo-500">Property</p>
          <p className="mb-2 text-xl font-medium text-gray-800">Real Estate Photo Editing: A 12-Step Guide to Stunning Property Images</p>
          <p className="text-md font-light text-gray-400">Enhance Your Property Listings with Professional Editing Techniques</p>
          <div className="justify-starts mt-4 flex flex-wrap items-center">
            <div className="mr-2 mt-1 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">#guide</div>
            <div className="mr-2 mt-1 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">#property</div>
          </div>
        </div>
      </a>
    </article>
    <article className="h-90 col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2">
      <a href="https://vocal.media/families/8-mistakes-young-people-make-when-buying-property" target="_blank" rel="noopener noreferrer" className="block h-full w-full">
        <img className="max-h-40 w-full object-cover" alt="featured image" src={blog2} />
        <div className="w-full bg-white p-4">
          <p className="text-md font-medium text-indigo-500">Tips</p>
          <p className="mb-2 text-xl font-medium text-gray-800">8 Mistakes Young People Make When Buying Property</p>
          <p className="text-md font-light text-gray-400">Finding property is one of the most exciting and terrifying experiences in life</p>
          <div className="justify-starts mt-4 flex flex-wrap items-center">
            <div className="mr-2 mt-1 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">#students</div>
            <div className="mr-2 mt-1 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">#property</div>
          </div>
        </div>
      </a>
    </article>
    
    
  </div>
</section>


  

  )
}
