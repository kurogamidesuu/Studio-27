// app/login/page.tsx
'use client'

import { useState } from 'react'
import { login } from './action'
import { KeyRound, Loader2, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setError('')
    
    const result = await login(formData)
    
    if (result?.error) {
      setError("That's not the secret code.")
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-amber-900/10 rounded-full blur-[120px]" />
      
      <div className="z-10 w-full max-w-md bg-zinc-900/50 border border-zinc-800 backdrop-blur-xl p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-700">
            <KeyRound className="text-amber-400" size={24} />
          </div>
          <h1 className="text-2xl font-serif text-white tracking-wide">Studio 27</h1>
          <p className="text-zinc-500 text-sm mt-2">Enter the secret key to access our world.</p>
        </div>

        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <input 
              name="password" 
              type="password" 
              placeholder="Secret Code..." 
              className="w-full bg-zinc-950/50 border border-zinc-700 rounded-xl px-4 py-3 text-center text-white tracking-widest focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder:text-zinc-700 placeholder:tracking-normal"
              autoFocus
            />
          </div>

          {error && (
            <div className="text-red-400 text-xs text-center animate-pulse">
              {error}
            </div>
          )}

          <div className="flex justify-center">
            <button 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
              {isLoading ? "Unlocking..." : "Enter Studio"}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
            Restricted Access
          </p>
        </div>
      </div>
    </main>
  )
}