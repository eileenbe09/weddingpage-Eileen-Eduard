// Sanfter SVG-Wellenübergang zwischen zwei Sektionen
// from = Farbe der oberen Sektion (Wellen-Füllung)
// to   = Hintergrundfarbe der unteren Sektion
// flip = Welle horizontal spiegeln für Abwechslung
export default function WaveDivider({
  from,
  to,
  flip = false,
  height = 56,
}: {
  from: string
  to: string
  flip?: boolean
  height?: number
}) {
  return (
    <div style={{ background: to, lineHeight: 0, display: 'block', overflow: 'hidden' }}>
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        style={{
          display: 'block',
          width: '100%',
          height: `${height}px`,
          transform: flip ? 'scaleX(-1)' : 'none',
        }}
        aria-hidden="true"
      >
        <path
          d="M0,0 L0,38 C200,56 400,18 720,42 C1040,56 1280,22 1440,38 L1440,0 Z"
          fill={from}
        />
      </svg>
    </div>
  )
}
