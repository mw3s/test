document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const nav = document.querySelector("nav ul")

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      this.classList.toggle("active")
      nav.classList.toggle("active")

      if (this.classList.contains("active")) {
        nav.style.display = "flex"
        nav.style.flexDirection = "column"
        nav.style.position = "absolute"
        nav.style.top = "80px"
        nav.style.left = "0"
        nav.style.width = "100%"
        nav.style.backgroundColor = "rgba(5, 5, 16, 0.9)"
        nav.style.padding = "2rem"

        document.querySelectorAll("nav ul li").forEach((item) => {
          item.style.margin = "1rem 0"
        })
      } else {
        nav.style.display = ""
        nav.style.flexDirection = ""
        nav.style.position = ""
        nav.style.top = ""
        nav.style.left = ""
        nav.style.width = ""
        nav.style.backgroundColor = ""
        nav.style.padding = ""

        document.querySelectorAll("nav ul li").forEach((item) => {
          item.style.margin = ""
        })
      }
    })
  }

  // Parallax effect for the glow
  document.addEventListener("mousemove", (e) => {
    const glowEffect = document.querySelector(".glow-effect")
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25

    if (glowEffect) {
      glowEffect.style.transform = `translate(calc(-50% + ${xAxis}px), calc(-50% + ${yAxis}px))`
    }
  })

  // Add interactive hover effect to the hero text
  const heroText = document.querySelectorAll(".hero-text h1 span")

  heroText.forEach((letter) => {
    letter.addEventListener("mouseenter", function () {
      this.style.color = "var(--primary-color)"
      this.style.textShadow = "0 0 20px var(--glow-color)"
      this.style.transform = "translateY(-20px)"
      this.style.transition = "all 0.3s ease"
    })

    letter.addEventListener("mouseleave", function () {
      this.style.color = ""
      this.style.textShadow = ""
      this.style.transform = ""
    })
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        })

        // Close mobile menu if open
        if (menuToggle && menuToggle.classList.contains("active")) {
          menuToggle.click()
        }
      }
    })
  })

  // Add animation to skill icons on scroll
  const skillItems = document.querySelectorAll(".skill-item")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    { threshold: 0.1 },
  )

  skillItems.forEach((item) => {
    item.style.opacity = 0
    item.style.transform = "translateY(20px)"
    item.style.transition = "all 0.5s ease"
    observer.observe(item)
  })

  // Active navigation based on scroll position
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll("nav ul li a")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.parentElement.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.parentElement.classList.add("active")
      }
    })
  })
})
