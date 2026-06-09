'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix default marker icon paths for Next.js/webpack
const RedIcon = L.divIcon({
  html: `
    <div style="position:relative;width:30px;height:42px;">
      <svg width="30" height="42" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 0C6.716 0 0 6.716 0 15c0 10.5 15 27 15 27s15-16.5 15-27C30 6.716 23.284 0 15 0z" fill="#dc2626"/>
        <circle cx="15" cy="15" r="6" fill="white"/>
        <circle cx="15" cy="15" r="3" fill="#dc2626"/>
      </svg>
    </div>
  `,
  className: '',
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -42],
})

export default function GabesMap() {
  const ref = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!ref.current || mapRef.current) return

    const map = L.map(ref.current, {
      center: [33.8863, 10.1028],
      zoom: 5,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: true,
      touchZoom: true,
    })

    // CartoDB dark_all - black ocean, dark grey land
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map)

    // Red pin on Gabès
    const marker = L.marker([33.8863, 10.1028], { icon: RedIcon }).addTo(map)

    // Pulse effect around the pin
    const pulseStyle = `
      @keyframes map-pulse {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
        100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
      }
    `
    const styleEl = document.createElement('style')
    styleEl.textContent = pulseStyle
    document.head.appendChild(styleEl)

    const pulseIcon = L.divIcon({
      html: `<div style="
        width: 20px; height: 20px;
        border-radius: 50%;
        background: rgba(220, 38, 38, 0.3);
        border: 2px solid rgba(220, 38, 38, 0.5);
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        animation: map-pulse 2.5s ease-out infinite;
      "></div>`,
      className: '',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    })

    L.marker([33.8863, 10.1028], { icon: pulseIcon, interactive: false }).addTo(map)

    mapRef.current = map

    // Fly to Gabès after a delay
    const timer = setTimeout(() => {
      map.flyTo([33.8863, 10.1028], 7, {
        duration: 2.5,
        easeLinearity: 0.25,
      })
    }, 1500)

    return () => {
      clearTimeout(timer)
      map.remove()
      mapRef.current = null
      styleEl.remove()
    }
  }, [])

  return (
    <div ref={ref} className="w-full h-full" />
  )
}
