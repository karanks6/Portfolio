import React, { useState } from 'react';
import { HotspotScreenData } from '../three/StickerHotspots';
import { StickerDefinition } from '../data/stickers';

interface StickerOverlayProps {
  hotspots: HotspotScreenData[];
  onStickerClick: (sticker: StickerDefinition) => void;
  stickers: StickerDefinition[];
}

export const StickerOverlay: React.FC<StickerOverlayProps> = ({
  hotspots,
  onStickerClick,
  stickers
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div
      className="sticker-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 20
      }}
    >
      {hotspots.map((hs) => {
        if (!hs.visible || hs.opacity < 0.1) return null;

        const stickerDef = stickers.find((s) => s.id === hs.id);
        const isHovered = hoveredId === hs.id;

        return (
          <div
            key={hs.id}
            style={{
              position: 'absolute',
              left: `${hs.x}px`,
              top: `${hs.y}px`,
              transform: 'translate(-50%, -50%)',
              opacity: hs.opacity,
              transition: 'opacity 0.2s ease',
              pointerEvents: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* Tooltip / Label */}
            <div
              style={{
                position: 'absolute',
                bottom: '100%',
                marginBottom: '8px',
                padding: '4px 10px',
                borderRadius: '999px',
                background: 'rgba(15, 17, 21, 0.92)',
                backdropFilter: 'blur(8px)',
                border: `1px solid ${isHovered ? hs.color : 'rgba(255, 255, 255, 0.15)'}`,
                color: '#fff',
                fontSize: '12px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                boxShadow: isHovered
                  ? `0 4px 16px ${hs.color}40, 0 2px 4px rgba(0,0,0,0.5)`
                  : '0 4px 12px rgba(0,0,0,0.4)',
                transform: isHovered ? 'scale(1.05) translateY(-2px)' : 'scale(1)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: isHovered || hs.opacity > 0.85 ? 1 : 0.7,
                pointerEvents: 'none'
              }}
            >
              <span>{hs.label}</span>
              {isHovered && hs.description && (
                <span style={{ fontSize: '11px', color: '#9ea3ae', marginLeft: '6px' }}>
                  • {hs.description}
                </span>
              )}
            </div>

            {/* Clickable Hotspot Anchor Button */}
            <button
              onClick={() => stickerDef && onStickerClick(stickerDef)}
              onMouseEnter={() => setHoveredId(hs.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(hs.id)}
              onBlur={() => setHoveredId(null)}
              aria-label={`Sticker ${hs.label}: ${hs.description || hs.label}`}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                outline: 'none',
                padding: 0,
                position: 'relative'
              }}
            >
              {/* Pulsing ring */}
              <span
                style={{
                  position: 'absolute',
                  inset: '4px',
                  borderRadius: '50%',
                  border: `2px solid ${hs.color}`,
                  boxShadow: `0 0 10px ${hs.color}60`,
                  animation: 'hotspot-pulse 2s infinite ease-in-out'
                }}
              />
              {/* Center dot */}
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: hs.color,
                  boxShadow: `0 0 8px ${hs.color}`
                }}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
};
