import React from 'react';
import { Music2, UserCircle2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-purple-900 via-violet-800 to-purple-900 text-white shadow-lg z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Music2 className="h-8 w-8 text-purple-200" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
              MoodSync
            </h1>
          </div>
          <button className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all">
            <UserCircle2 className="h-5 w-5" />
            <span>Sign In</span>
          </button>
        </div>
      </div>
    </header>
  );
}