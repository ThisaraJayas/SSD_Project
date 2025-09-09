import React from 'react'

export default function HomeTestimonial() {
  return (
    <div>
        {/* <section className="bg-emerald-50 py-12 sm:py-16 lg:py-20">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col items-center">
      <div className="text-center">
        <p className="text-lg font-medium text-green-600">Over 1000+ people, including students, trust Dorm for their housing needs.</p>
        <h2 className="mt-4 text-3xl font-bold text-blue-900 sm:text-4xl xl:text-5xl">What do our users have to say about us?
        </h2>
      </div>

      <div className="mt-8 text-center md:order-3 md:mt-16">
        <button className="mb-20 rounded-lg border-2 border-emerald-700 bg-emerald-700 px-6 py-2 font-medium text-white transition hover:translate-y-1">More reviews on Google Reviews</button>
      </div>

      <div className="relative mt-10 md:order-2 md:mt-24">
        <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
          <div className="mx-auto h-full w-full max-w-5xl rounded-3xl opacity-30 blur-lg filter"></div>
        </div>

        <div className="relative mx-auto grid max-w-lg grid-cols-1 gap-6 md:max-w-none md:grid-cols-3 lg:gap-10">
          <div className="flex flex-col overflow-hidden rounded-xl border shadow-sm">
            <div className="flex flex-1 flex-col justify-between bg-white p-6 lg:px-7 lg:py-8">
              <div className="flex-1">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>

                <blockquote className="mt-8 flex-1">
                  <p className="font-[400] text-xl italic text-blue-900">“Was looking to book an accomodation with my friends under a budget and Dorm.lk was very helpful. Thank you!”</p>
                </blockquote>
              </div>

              <div className="mt-8 flex items-center">
                <img className="h-11 w-11 flex-shrink-0 rounded-full object-cover" src="/images/Ju6-1negUEjTnBKw_ZP4r.png" alt="" />
                <div className="ml-4">
                  <p className="text-base font-bold text-blue-900">Akorn Veesle</p>
                  <p className="mt-0.5 text-sm text-gray-500">CEO Lufthansa Corp</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-xl border shadow-sm">
            <div className="flex flex-1 flex-col justify-between bg-white p-6 lg:px-7 lg:py-8">
              <div className="flex-1">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>

                <blockquote className="mt-8 flex-1">
                  <p className="font-[400] text-xl italic text-blue-900">“Couldn't ask for more. Extra thanks to amber for coordinating with me on every step.”</p>
                </blockquote>
              </div>

              <div className="mt-8 flex items-center">
                <img className="h-11 w-11 flex-shrink-0 rounded-full object-cover" src="/images/Ju6-1negUEjTnBKw_ZP4r.png" alt="" />
                <div className="ml-4">
                  <p className="text-base font-bold text-blue-900">Akorn Veesle</p>
                  <p className="mt-0.5 text-sm text-gray-500">CEO Lufthansa Corp</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-xl border shadow-sm">
            <div className="flex flex-1 flex-col justify-between bg-white p-6 lg:px-7 lg:py-8">
              <div className="flex-1">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>

                <blockquote className="mt-8 flex-1">
                  <p className="font-[400] text-xl italic text-blue-900">Dorm.lk's outstanding service made my accommodation booking seamless. Their agent was patience and clear communication was exceptional. Highly recommend Dorm.lk!”</p>
                </blockquote>
              </div>

              <div className="mt-8 flex items-center">
                <img className="h-11 w-11 flex-shrink-0 rounded-full object-cover" src="/images/Ju6-1negUEjTnBKw_ZP4r.png" alt="" />
                <div className="ml-4">
                  <p className="text-base font-bold text-blue-900">Akorn Veesle</p>
                  <p className="mt-0.5 text-sm text-gray-500">CEO Lufthansa Corp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> */}
<section className="py-12 text-green-900 sm:py-16 lg:py-20 bg-slate-50">
  <div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col items-center">
      <div className="text-center">
        <p className="text-lg font-medium text-green-900">Over 1000+ people, including students, trust Dorm.lk for their housing needs.</p>
        <h2 className="mt-4 text-3xl font-bold text-black sm:text-4xl xl:text-5xl">User Testimonials</h2>
      </div>

      <div className="order-3 mt-8 text-center md:mt-16">
        <button className="mb-20 rounded-lg border-2 border-green-700 bg-green-700 px-6 py-2 font-medium text-white transition hover:translate-y-1">More reviews on Google</button>
      </div>

      <div className="relative mx-auto mt-20 grid max-w-lg grid-cols-1 gap-6 md:max-w-none md:grid-cols-3 lg:gap-10">
        

        <div className="flex flex-col rounded-xl border border-green-600 text-center shadow-xl shadow-green-200">
          <div className="relative flex flex-1 flex-col justify-between p-6 lg:py-7 lg:px-5">
            <span className="absolute -left-5 -top-6 rounded-full border border-green-600 bg-white p-3 text-5xl">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.16 3.5C4.73 5.06 3.55 6.67 3.55 9.36c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.9 0-2.99-1.52-2.99-4.25c0-3.8 1.75-6.53 5.02-8.42L7.16 3.5zm7 0c-2.43 1.56-3.61 3.17-3.61 5.86c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.89 0-2.98-1.52-2.98-4.25c0-3.8 1.75-6.53 5.02-8.42l1.14 1.84h-.01z" clip-rule="evenodd" /></svg>
            </span>
            <div className="flex-1">
              <p className="border-green-500 px-10 text-xl font-black">Service was amazing!</p>

              <blockquote className="mt-8 flex-1">
                <p className="leading-relaxed text-green-900">Dorm.lk's outstanding service made my accommodation booking seamless. Their agent was patience and clear communication was exceptional. Highly recommend Dorm.lk!</p>
              </blockquote>
            </div>

            <div className="-mx-5 mt-8 px-8 py-1">
              <div className="">
                <p className="text-base font-bold">Kamal Perera</p>
                <p className="text-green-90 mt-0.5 text-sm"></p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-xl border border-green-600 text-center shadow-xl shadow-green-200">
          <div className="relative flex flex-1 flex-col justify-between p-6 lg:py-7 lg:px-5">
            <span className="absolute -left-5 -top-6 rounded-full border border-green-600 bg-white p-3 text-5xl">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.16 3.5C4.73 5.06 3.55 6.67 3.55 9.36c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.9 0-2.99-1.52-2.99-4.25c0-3.8 1.75-6.53 5.02-8.42L7.16 3.5zm7 0c-2.43 1.56-3.61 3.17-3.61 5.86c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.89 0-2.98-1.52-2.98-4.25c0-3.8 1.75-6.53 5.02-8.42l1.14 1.84h-.01z" clip-rule="evenodd" /></svg>
            </span>
            <div className="flex-1">
              <p className="border-green-500 px-10 text-xl font-black">Absolutely recommended!</p>

              <blockquote className="mt-8 flex-1">
                <p className="leading-relaxed text-green-900">Was looking to book an accomodation with my friends under a budget and Dorm.lk was very helpful. Thank you!</p>
              </blockquote>
            </div>

            <div className="-mx-5 mt-8 px-8 py-1">
              <div className="">
                <p className="text-base font-bold">Devika Rajendran</p>
                <p className="mt-0.5 text-sm"></p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-xl border border-green-600 text-center shadow-xl shadow-green-200">
          <div className="relative flex flex-1 flex-col justify-between p-6 lg:py-7 lg:px-5">
            <span className="absolute -left-5 -top-6 rounded-full border border-green-600 bg-white p-3 text-5xl">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.16 3.5C4.73 5.06 3.55 6.67 3.55 9.36c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.9 0-2.99-1.52-2.99-4.25c0-3.8 1.75-6.53 5.02-8.42L7.16 3.5zm7 0c-2.43 1.56-3.61 3.17-3.61 5.86c.16-.05.3-.05.44-.05c1.27 0 2.5.86 2.5 2.41c0 1.61-1.03 2.61-2.5 2.61c-1.89 0-2.98-1.52-2.98-4.25c0-3.8 1.75-6.53 5.02-8.42l1.14 1.84h-.01z" clip-rule="evenodd" /></svg>
            </span>
            <div className="flex-1">
              <p className="border-green-500 px-10 text-xl font-black">Saved me 1000s of hours</p>

              <blockquote className="mt-8 flex-1">
                <p className="leading-relaxed text-green-900">Dorm.lk saved me countless hours of searching for the perfect accommodation. Their platform is incredibly user-friendly, and the support I received throughout the process was top-notch.</p>
              </blockquote>
            </div>

            <div className="-mx-5 mt-8 px-8 py-1">
              <div className="">
                <p className="text-base font-bold">Jenny Krishara</p>
                <p className="text-green-90 mt-0.5 text-sm"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}
