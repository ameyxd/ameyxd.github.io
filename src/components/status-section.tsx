'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Music, Running } from 'lucide-react';

interface StatusData {
  spotify: { name: string; artist: string } | null;
  location: { lat: number; lng: number };
  strava: { name: string; distance: number; date: string } | null;
}

export function StatusSection() {
  const [status, setStatus] = useState<StatusData | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await fetch('/api/status');
      const data = await res.json();
      setStatus(data);
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  if (!status) return null;

  return (
    <div className="bg-secondary p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Current Status</h2>
      {status.spotify && (
        <div className="flex items-center mb-2">
          <Music className="mr-2" />
          <p>
            Listening to {status.spotify.name} by {status.spotify.artist}
          </p>
        </div>
      )}
      <div className="flex items-center mb-2">
        <MapPin className="mr-2" />
        <p>Houston, TX</p>
        <motion.div
          className="w-2 h-2 bg-green-500 rounded-full ml-2"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      {status.strava && (
        <div className="flex items-center">
          <Running className="mr-2" />
          <p>
            Last workout: {status.strava.name} ({status.strava.distance / 1000}km)
          </p>
        </div>
      )}
    </div>
  );
}
