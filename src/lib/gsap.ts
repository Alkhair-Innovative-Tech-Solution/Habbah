import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registered once at module-evaluation time (before any component effect
// runs), so components never race each other for plugin registration.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
