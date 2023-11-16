import { useSpring, animated } from '@react-spring/web';

type AnimatedNumberProps = {
  maxNumber: number;
};

export const AnimatedNumber = ({ maxNumber }: AnimatedNumberProps) => {
  const { number } = useSpring({
    number: maxNumber,
    from: { number: 0 },
    config: { duration: 1000 },
  });
  const showNumber = number.to((num) => {
    return Math.round(num);
  });
  return <animated.p className="text-3xl">{showNumber}</animated.p>;
};
