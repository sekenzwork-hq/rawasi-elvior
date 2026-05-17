import logo1 from "./assets/logo1.png";

export default function App() {
  return (
    <div className="page-wrap">
      {/* Grain texture overlay */}
      <div className="grain"></div>

      {/* Top golden spotlight */}
      <div className="spotlight"></div>

      {/* Floor ambient glows */}
      <div className="floor-glow-left"></div>
      <div className="floor-glow-right"></div>

      {/* Left smoke — multiple rising puffs */}
      <div className="smoke-side smoke-side--left">
        <div className="puff puff--1"></div>
        <div className="puff puff--2"></div>
        <div className="puff puff--3"></div>
        <div className="puff puff--4"></div>
        <div className="puff puff--5"></div>
        <div className="puff puff--6"></div>
      </div>

      {/* Right smoke — mirrored */}
      <div className="smoke-side smoke-side--right">
        <div className="puff puff--1"></div>
        <div className="puff puff--2"></div>
        <div className="puff puff--3"></div>
        <div className="puff puff--4"></div>
        <div className="puff puff--5"></div>
        <div className="puff puff--6"></div>
      </div>

      {/* Content */}
      <div className="content">

        {/* Crest Logo */}
        <div className="logo-wrap">
          <img src={logo1} alt="Rawasi Elvior Crest" className="logo-img" />
        </div>

        {/* Brand Name */}
        <h2 className="brand-name">Rawasi Elvior</h2>

        {/* Luxury Perfumes divider */}
        <div className="divider-row">
          <div className="div-line div-line-l"></div>
          <span className="div-label">Luxury Perfumes</span>
          <div className="div-line div-line-r"></div>
        </div>

        {/* Main Headline */}
        <h1 className="headline">Launching Soon.</h1>

        {/* Diamond ornament */}
        <div className="ornament-row">
          <div className="orn-line orn-line-l"></div>
          <div className="orn-diamond">
            <div className="orn-dot"></div>
          </div>
          <div className="orn-line orn-line-r"></div>
        </div>

        {/* Tagline */}
        <p className="tagline">Crafted for a bold first impression.</p>

      </div>
    </div>
  );
}