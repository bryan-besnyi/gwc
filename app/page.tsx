"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiSource, setApiSource] = useState<"nextjs" | "python">("nextjs");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const endpoint = apiSource === "nextjs" 
        ? `/api/nextjs-hello` 
        : `/api/python-hello`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      setGreeting(`${data.message} (Processed by: ${data.processedOn || apiSource})`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-indigo-100">
      <main className="flex w-full max-w-md flex-col items-center gap-8 rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-indigo-600">Say Hello App</h1>
        <p className="text-center text-gray-600">
          Enter your name below and our backend API will return a personalized greeting!
        </p>
        
        <div className="w-full">
          <p className="block text-sm font-medium text-gray-700 mb-2">Select API Source:</p>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                name="apiSource"
                checked={apiSource === "nextjs"}
                onChange={() => setApiSource("nextjs")}
              />
              <span className="ml-2">Next.js API</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                name="apiSource"
                checked={apiSource === "python"}
                onChange={() => setApiSource("python")}
              />
              <span className="ml-2">Python Flask API</span>
            </label>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="Enter your name"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !name.trim()}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Get Greeting'}
          </button>
        </form>
        
        {greeting && (
          <div className="mt-6 w-full rounded-md bg-green-50 p-4 text-center animate-fade-in">
            <p className="text-xl font-medium text-green-800">{greeting}</p>
          </div>
        )}
        
        {error && (
          <div className="mt-6 w-full rounded-md bg-red-50 p-4 text-center">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}
        
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            This is a simple full stack app demonstrating multiple API implementations.
          </p>
        </div>
      </main>
      
      <footer className="mt-8 flex gap-6 flex-wrap items-center justify-center text-sm text-gray-600">
        <a
          className="flex items-center gap-2 hover:text-indigo-600 transition-colors"
          href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers"
          target="_blank"
          rel="noopener noreferrer"
        >
          Next.js API Docs
        </a>
        <a
          className="flex items-center gap-2 hover:text-indigo-600 transition-colors"
          href="https://flask.palletsprojects.com/en/2.3.x/quickstart/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Flask API Docs
        </a>
        <a
          className="flex items-center gap-2 hover:text-indigo-600 transition-colors"
          href="/presentation"
        >
          View Presentation
        </a>
      </footer>
    </div>
  );
}
