'use client';

import { useState, useEffect } from 'react';
import { Icons } from "@/components/icons";

import { motion } from 'framer-motion';
import { MapPin, Music } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StatusData {
  spotify: { name: string; artist: string } | null;
  location: { lat: number; lng: number };
}

export function StatusDock() {
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
    <Dock className="z-40 pointer-events-auto relative mx-auto flex min-h-12 h-12 items-center px-1 bg-background/80 backdrop-blur-sm [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] mt-2">
      <DockIcon>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center justify-center size-8">
              <MapPin className="size-4" />
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Houston, TX</p>
          </TooltipContent>
        </Tooltip>
      </DockIcon>
      {status.spotify && (
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center size-8">
                <Icons.spotify className="size-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {status.spotify.name} by {status.spotify.artist}
              </p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      )}
    </Dock>
  );
}
