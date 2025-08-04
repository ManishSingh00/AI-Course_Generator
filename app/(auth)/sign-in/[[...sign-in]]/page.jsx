import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <section className="bg-white min-h-screen overflow-hidden">
      <div className="lg:grid lg:grid-cols-12 min-h-screen">
        {/* Left Section */}
        <section className="relative flex items-end lg:items-center bg-gray-900 lg:col-span-5 xl:col-span-6 min-h-screen">
          <img
            alt="Learning background"
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80

"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          <div className="relative z-10 p-6 sm:p-12 text-white">

            <h2 className="text-3xl font-bold sm:text-4xl">Welcome to CourseCrafter</h2>
            <p className="mt-4 text-white/90 text-lg max-w-md">
              Create AI-powered courses personalized just for you. Learn faster, smarter, and your way.
            </p>
          </div>
        </section>

        {/* Right Section */}
        <main className="flex items-center justify-center px-6 sm:px-12 lg:col-span-7 xl:col-span-6 min-h-screen overflow-hidden">
          <div className="w-full max-w-xl lg:max-w-md">
            {/* <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-6">Sign in to continue</h1> */}
            <SignIn />
            
          </div>
        </main>
      </div>
    </section>
  )
}
