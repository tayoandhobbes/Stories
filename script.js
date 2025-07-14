const mask = document.querySelector('.parallax-mask');
const inner = document.querySelector('.parallax-inner');

function getTransformValues() {
  const rect = mask.getBoundingClientRect();
  const scrollTop = window.scrollY || window.pageYOffset;
  const elementTop = rect.top + scrollTop;
  const elementHeight = mask.offsetHeight;
  const windowHeight = window.innerHeight;

  const distance = elementTop - scrollTop;
  const progress = (windowHeight - distance) / (windowHeight + elementHeight);
  const maskShift = -distance * 0.2;
  const innerOffset = 25;
  const innerShift = -distance * 0.4 + innerOffset;
  const scale = 1 + progress * 0.05;

  return {
    maskTransform: `translate3d(0, ${maskShift}px, 0)`,
    innerTransform: `translate3d(0, ${innerShift}px, 0) scale(${scale})`
  };
}

function applyTransform() {
  const { maskTransform, innerTransform } = getTransformValues();
  mask.style.transform = maskTransform;
  inner.style.transform = innerTransform;
}

// DOM fully parsed — do this as early as possible
document.addEventListener('DOMContentLoaded', () => {
  applyTransform();
  requestAnimationFrame(applyTransform);
});

// All assets loaded (including image) — ensures 100% layout stability
window.addEventListener('load', () => {
  applyTransform();
  requestAnimationFrame(applyTransform);
});

// Recalculate on scroll
window.addEventListener('scroll', () => {
  requestAnimationFrame(applyTransform);
});