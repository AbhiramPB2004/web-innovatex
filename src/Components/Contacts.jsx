import React from 'react'

const Contacts = () => {
  return (
    <div class="container mx-auto px-4">
            <h2 class="orbitron text-3xl md:text-4xl font-bold mb-12 text-center text-cyan-400">Get In Touch</h2>
            <div class="grid md:grid-cols-2 gap-8">
                <div class="gradient-border bg-black p-6 rounded-xl">
                    <form id="contact-form" class="space-y-4">
                        <div>
                            <label class="block text-cyan-400 mb-2">Name</label>
                            <input type="text" class="w-full bg-gray-900 border border-cyan-500/30 rounded p-2 text-white" required/>
                        </div>
                        <div>
                            <label class="block text-cyan-400 mb-2">Email</label>
                            <input type="email" class="w-full bg-gray-900 border border-cyan-500/30 rounded p-2 text-white" required/>
                        </div>
                        <div>
                            <label class="block text-cyan-400 mb-2">Message</label>
                            <textarea class="w-full bg-gray-900 border border-cyan-500/30 rounded p-2 text-white h-32" required></textarea>
                        </div>
                        <button type="submit" class="w-full bg-cyan-400 text-black py-2 rounded hover:bg-cyan-300">Send Message</button>
                    </form>
                </div>
                <div class="space-y-6">
                    <div class="flex items-center gap-4">
                        <i class="bi bi-geo-alt text-2xl text-cyan-400"></i>
                        <div>
                            <h3 class="text-xl text-cyan-400">Location</h3>
                            <p class="text-gray-300">Presidency University Bangalore, Rajanukunte</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-4">
                        <i class="bi bi-envelope text-2xl text-cyan-400"></i>
                        <div>
                            <h3 class="text-xl text-cyan-400">Email</h3>
                            <p class="text-gray-300">info@nexus2024.com</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-4">
                        <i class="bi bi-phone text-2xl text-cyan-400"></i>
                        <div>
                            <h3 class="text-xl text-cyan-400">Phone</h3>
                            <p class="text-gray-300">+91 98765 43210</p>
                        </div>
                    </div>
                    <div class="flex gap-4 mt-8">
                        <a href="#" class="text-2xl text-cyan-400 hover:text-cyan-300"><i class="bi bi-facebook"></i></a>
                        <a href="#" class="text-2xl text-cyan-400 hover:text-cyan-300"><i class="bi bi-instagram"></i></a>
                        <a href="#" class="text-2xl text-cyan-400 hover:text-cyan-300"><i class="bi bi-linkedin"></i></a>
                        <a href="#" class="text-2xl text-cyan-400 hover:text-cyan-300"><i class="bi bi-twitter-x"></i></a>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Contacts