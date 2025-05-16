import React from 'react';
import Header from './components/Header';
import ComicGenerator from './components/ComicGenerator';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col text-gray-100">
      <Header />
      <p className="text-center text-gray-400 mt-4">
        Praise, Comify, Roast your code snippets!
      </p>  
      <main className="flex-grow container mx-auto px-4 py-8">
        <ComicGenerator />
      </main>
      <Footer />
    </div>
  );
}

export default App;