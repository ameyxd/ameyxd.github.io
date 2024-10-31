import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const currentTrack = {
      body: {
        item: {
          name: "Mock Track Name",
          artists: [{ name: "Mock Artist Name" }]
        }
      }
    };

    return NextResponse.json({
      spotify: currentTrack.body.item ? {
        name: currentTrack.body.item.name,
        artist: currentTrack.body.item.artists[0].name,
      } : null,
      location: {
        lat: 29.7604, // Houston, TX coordinates
        lng: -95.3698,
      },
      // We're not using Strava data in the StatusDock, so you can remove it if you want
    });
  } catch (error) {
    console.error('Error fetching status:', error);
    return NextResponse.json({ error: 'Failed to fetch status' }, { status: 500 });
  }
}
