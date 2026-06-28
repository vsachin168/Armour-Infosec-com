/**
 * Ambient background wash for hero / CTA sections.
 *
 * After the clean-professional redesign this renders at most a single, very
 * subtle radial wash in the accent colour. All the previous decorative layers
 * (animated grid, hex / circuit / dot textures, breathing glows, floating
 * particles) were retired. Legacy props are still accepted so existing call
 * sites keep compiling, but they are ignored.
 */

interface CyberAmbientProps {
  /** Legacy decorative props — accepted but ignored after the redesign. */
  hex?: boolean
  circuit?: boolean
  dots?: boolean
  particles?: boolean
  grid?: boolean
  glow?: boolean
  redGlow?: boolean
  intensity?: number
}

export function CyberAmbient(_props: CyberAmbientProps = {}) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, var(--color-accent-glow), transparent 70%)',
          opacity: 0.5,
        }}
      />
    </div>
  )
}
