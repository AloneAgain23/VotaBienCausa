import Image from 'next/image';

const POSES: Record<string, string> = {
  normal:   '/llama-normal.png',
  señala:   '/llama-señala.png',
  celebra:  '/llama-celebra.png',
};

export default function LlamaMascot({ pose = 'normal', size = 160, style }: { pose?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <div style={{ width: size, height: size, ...style }}>
      <Image src={POSES[pose] ?? POSES.normal} alt="Mascota VotaBien" width={size} height={size} style={{ objectFit: 'contain' }} />
    </div>
  );
}