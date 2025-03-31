import * as SliderPrimitive from "@radix-ui/react-slider";
import styles from "./slider.module.css";

type Props = {
  setZoom: (zoom: number) => void;
  zoom: number;
};

export const Slider = ({ setZoom, zoom }: Props) => (
  <SliderPrimitive.Root
    className={styles.root}
    max={150}
    min={50}
    onValueChange={(values) => setZoom(values[0] / 50)}
    step={1}
    value={[zoom * 50]}
  >
    <SliderPrimitive.Track className={styles.track}>
      <SliderPrimitive.Range className={styles.range} />
    </SliderPrimitive.Track>

    <SliderPrimitive.Thumb aria-label={"Zoom"} className={styles.thumb} />
  </SliderPrimitive.Root>
);
