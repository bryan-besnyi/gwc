'use client';
import { useState } from 'react';

// Define TypeScript interfaces for API responses
interface ApiResponse {
  message: string;
  timestamp: string;
  processedOn: string;
}

interface ApiError {
  error: string;
}

type ApiResult = ApiResponse | ApiError | null;

export default function ApiTest() {
  const [nextjsGetResult, setNextjsGetResult] = useState<ApiResult>(null);
  const [nextjsPostResult, setNextjsPostResult] = useState<ApiResult>(null);
  const [pythonGetResult, setPythonGetResult] = useState<ApiResult>(null);
  const [pythonPostResult, setPythonPostResult] = useState<ApiResult>(null);
  const [loading, setLoading] = useState(false);
  
  // Next.js API tests
  const testNextjsGet = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/nextjs-hello?name=NextJSClient');
      const data = await res.json();
      setNextjsGetResult(data);
    } catch (error) {
      console.error('Error testing Next.js GET:', error);
    }
    setLoading(false);
  };
  
  const testNextjsPost = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/nextjs-hello', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'NextJSClientPost' })
      });
      const data = await res.json();
      setNextjsPostResult(data);
    } catch (error) {
      console.error('Error testing Next.js POST:', error);
    }
    setLoading(false);
  };
  
  // Python API tests
  const testPythonGet = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/python-hello?name=PythonClient');
      const data = await res.json();
      setPythonGetResult(data);
    } catch (error) {
      console.error('Error testing Python GET:', error);
    }
    setLoading(false);
  };
  
  const testPythonPost = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/python-hello', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'PythonClientPost' })
      });
      const data = await res.json();
      setPythonPostResult(data);
    } catch (error) {
      console.error('Error testing Python POST:', error);
    }
    setLoading(false);
  };
  
  return (
    <div className="p-4 space-y-8">
      <h2 className="text-2xl font-bold text-center mb-4">API Testing</h2>
      
      <div className="border p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Next.js API</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <button 
              onClick={testNextjsGet}
              className="px-4 py-2 bg-blue-500 text-white rounded mb-2 hover:bg-blue-600"
              disabled={loading}
            >
              Test Next.js GET
            </button>
            {nextjsGetResult && (
              <pre className="mt-2 p-2 bg-gray-100 rounded overflow-x-auto text-xs">
                {JSON.stringify(nextjsGetResult, null, 2)}
              </pre>
            )}
          </div>
          
          <div>
            <button 
              onClick={testNextjsPost}
              className="px-4 py-2 bg-green-500 text-white rounded mb-2 hover:bg-green-600"
              disabled={loading}
            >
              Test Next.js POST
            </button>
            {nextjsPostResult && (
              <pre className="mt-2 p-2 bg-gray-100 rounded overflow-x-auto text-xs">
                {JSON.stringify(nextjsPostResult, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
      
      <div className="border p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Python API</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <button 
              onClick={testPythonGet}
              className="px-4 py-2 bg-purple-500 text-white rounded mb-2 hover:bg-purple-600"
              disabled={loading}
            >
              Test Python GET
            </button>
            {pythonGetResult && (
              <pre className="mt-2 p-2 bg-gray-100 rounded overflow-x-auto text-xs">
                {JSON.stringify(pythonGetResult, null, 2)}
              </pre>
            )}
          </div>
          
          <div>
            <button 
              onClick={testPythonPost}
              className="px-4 py-2 bg-pink-500 text-white rounded mb-2 hover:bg-pink-600"
              disabled={loading}
            >
              Test Python POST
            </button>
            {pythonPostResult && (
              <pre className="mt-2 p-2 bg-gray-100 rounded overflow-x-auto text-xs">
                {JSON.stringify(pythonPostResult, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 