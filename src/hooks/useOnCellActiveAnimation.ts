import { useRef } from "react";
import Animated, {
  useDerivedValue,
  withSpring,
  WithSpringConfig,
  useSharedValue
} from "react-native-reanimated";
import { DEFAULT_ANIMATION_CONFIG } from "../constants";
import { useAnimatedValues } from "../context/animatedValueContext";
import { useIsActive } from "../context/cellContext";

type Params = {
  animationConfig: Partial<WithSpringConfig>;
};

export function useOnCellActiveAnimation(
  { animationConfig }: Params = { animationConfig: {} }
) {
  const animationConfigRef = useSharedValue(animationConfig);
  animationConfigRef.value = animationConfig;

  const isActive = useIsActive();

  const { isTouchActiveNative } = useAnimatedValues();

  const onActiveAnim = useDerivedValue(() => {
    const springConfig = {
      ...DEFAULT_ANIMATION_CONFIG,
      ...animationConfig
    }
    const toVal = isActive && isTouchActiveNative.value ? 1 : 0;
    return withSpring(toVal, springConfig);
  }, [isActive]);

  return {
    isActive,
    onActiveAnim,
  };
}
