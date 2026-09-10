import { ImageResponse } from 'next/og'

export const alt = 'Magariyetu — Kenya’s vehicle marketplace'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: '#13231d', color: 'white', display: 'flex', height: '100%', width: '100%', padding: 64, flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ color: '#f5af19', fontSize: 30, letterSpacing: 4 }}>KENYA’S VEHICLE MARKETPLACE</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 82, fontWeight: 800, letterSpacing: -4 }}>MAGARI YETU</div>
        <div style={{ fontSize: 34, color: '#d6dfda', marginTop: 18 }}>Cars, trucks, machinery and more — from verified sellers.</div>
      </div>
      <div style={{ fontSize: 26, color: '#d6dfda' }}>magariyetu.co.ke</div>
    </div>,
    size,
  )
}
