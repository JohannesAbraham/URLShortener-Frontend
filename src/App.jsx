import { useState } from "react";
import axios from "axios";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [adminUrls, setAdminUrls] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://urlshortener-backend-1-cxtx.onrender.com/shorten`, { longUrl });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAdminUrls = async () => {
    try {
      const res = await axios.get(`https://urlshortener-backend-1-cxtx.onrender.com/admin/urls`);
      setAdminUrls(res.data);
      setShowAdmin(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">URL Shortener</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter long URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Shorten
          </button>
        </form>
        {shortUrl && (
          <div className="mt-6">
            <p className="text-gray-700 font-medium">Short URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-semibold underline break-all"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Admin Panel</h2>
        <button
          onClick={fetchAdminUrls}
          className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-red-700 transition"
        >
          Show All URLs
        </button>

        {adminUrls.map((url, index) => (
          <div key={index} className="mb-3 p-2 border-b border-gray-200">
            <p><span className="font-semibold">Long URL:</span> {url.longUrl}</p>
            <p>
              <span className="font-semibold">Short URL:</span> 
              <a href={url.shortUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline ml-1">
                {url.shortUrl}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
