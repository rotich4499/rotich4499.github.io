---
layout: home
title: Welcome
---

<style>
  .hero {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    padding: 0 2rem;
  }
  .hero-content {
    max-width: 800px;
  }
  .title {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }
  .subtitle {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    font-weight: 300;
    opacity: 0.9;
  }
  .social-links a {
    color: white;
    margin: 0 15px;
    font-size: 1.2rem;
    text-decoration: none;
    transition: all 0.3s ease;
    padding: 8px 15px;
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 5px;
  }
  .social-links a:hover {
    background-color: rgba(255,255,255,0.1);
    transform: translateY(-2px);
  }
</style>

<div class="hero">
  <div class="hero-content">
    <h1 class="title">{{ page.title }}</h1>
    <p class="subtitle">Developer & Technology Enthusiast</p>
    
    <div class="social-links">
      <a href="https://github.com/rotich4499" target="_blank">GitHub</a>
      <a href="https://www.linkedin.com/in/rotich4499" target="_blank">LinkedIn</a>
    </div>
  </div>
</div>
