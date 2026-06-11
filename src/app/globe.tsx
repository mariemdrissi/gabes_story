'use client'

import Globe from 'react-globe.gl'

export default function GlobeScene() {
  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
      backgroundColor="rgba(0,0,0,0)"
      pointsData={[
        {
          lat: 33.8869,
          lng: 10.0982,
          size: 0.5,
          color: '#ef4444'
        }
      ]}
      pointAltitude="size"
      pointColor="color"
    />
  )
}
