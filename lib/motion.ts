import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let scrollTriggerRegistered = false;

export function ensureScrollTrigger() {
  if (!scrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    scrollTriggerRegistered = true;
  }
  return ScrollTrigger;
}
