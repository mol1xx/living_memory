document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(".reveal");
    const parallaxElements = document.querySelectorAll("[data-parallax]");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (revealElements.length) {
        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            revealElements.forEach((element) => element.classList.add("is-visible"));
        } else {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const delay = entry.target.dataset.delay;
                    if (delay) {
                        entry.target.style.setProperty("--reveal-delay", `${delay}s`);
                    }

                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            }, {
                threshold: 0.18,
                rootMargin: "0px 0px -10% 0px"
            });

            revealElements.forEach((element) => revealObserver.observe(element));
        }
    }

    if (!parallaxElements.length || prefersReducedMotion) {
        return;
    }

    const updateParallax = () => {
        const viewportHeight = window.innerHeight;

        parallaxElements.forEach((element) => {
            const strength = Number(element.dataset.parallax || 0);
            const rect = element.getBoundingClientRect();
            const progress = (rect.top + rect.height * 0.5 - viewportHeight * 0.5) / viewportHeight;
            const offset = Math.max(-1, Math.min(1, progress)) * strength * -1;

            element.style.setProperty("--parallax-offset", `${offset}px`);
        });
    };

    let ticking = false;

    const requestTick = () => {
        if (ticking) {
            return;
        }

        ticking = true;
        window.requestAnimationFrame(() => {
            updateParallax();
            ticking = false;
        });
    };

    updateParallax();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);
});
