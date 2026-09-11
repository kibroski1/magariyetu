import { ImageResponse } from 'next/og'

export const alt = 'Magariyetu — Kenya’s vehicle marketplace'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: '#10233F', color: '#F6F4EE', display: 'flex', height: '100%', width: '100%', padding: 64, flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ color: '#C98A2B', fontSize: 30, letterSpacing: 4 }}>KENYA’S VEHICLE MARKETPLACE</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 82, fontWeight: 800, letterSpacing: -4 }}>MAGARIYETU</div>
        <div style={{ fontSize: 34, color: '#D4DBE7', marginTop: 18 }}>Cars, trucks, machinery and more — from verified sellers.</div>
      </div>
      <div style={{ fontSize: 26, color: '#D4DBE7' }}>magariyetu.co.ke</div>
    </div>,
    size,
  )
}
