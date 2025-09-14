const CircleAnimation = () => {
  return <div id="container-inside" className="absolute inset-0 overflow-hidden">
      <div id="circle-small" className="absolute rounded-full bg-white/10 w-96 h-96 animate-pulse-slow" style={{
      top: '20%',
      left: '-10%',
      animationDelay: '0s',
      transform: 'scale(1)',
      animation: 'moveUpDown 15s infinite ease-in-out'
    }}></div>
      <div id="circle-medium" className="absolute rounded-full bg-white/10 w-120 h-120 animate-pulse-slow" style={{
      bottom: '-10%',
      left: '20%',
      animationDelay: '0.5s',
      transform: 'scale(1.2)',
      animation: 'moveLeftRight 20s infinite ease-in-out'
    }}></div>
      <div id="circle-large" className="absolute rounded-full bg-white/10 w-144 h-144 animate-pulse-slow" style={{
      top: '-20%',
      right: '-10%',
      animationDelay: '1s',
      transform: 'scale(1.5)',
      animation: 'moveDownUp 18s infinite ease-in-out'
    }}></div>
      <div id="circle-xlarge" className="absolute rounded-full bg-white/8 w-160 h-160 animate-pulse-slow" style={{
      bottom: '-30%',
      right: '-20%',
      animationDelay: '1.5s',
      transform: 'scale(1.8)',
      animation: 'moveRightLeft 25s infinite ease-in-out'
    }}></div>
    </div>;
};
export default CircleAnimation;