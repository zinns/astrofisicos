import { OrbitGraphic } from "@/components/motion/orbit-graphic";
import { StarField } from "@/components/motion/star-field";

export function CosmicBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <StarField />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgb(0_174_239_/_0.18),_transparent_40%)]" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgb(255_194_26_/_0.16),_transparent_60%)] blur-3xl" />
      <OrbitGraphic />
    </div>
  );
}

