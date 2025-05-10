<template>
  <div class="about-page">
    <div class="hero-section">
      <h1>Über Uns</h1>
      <p class="subtitle">Exklusiv. Erlesen. Einfach genießen.</p>
    </div>

    <div class="trust-section">
      <div class="container">
        <div class="intro-text">
          <h2>Unsere Geschichte</h2>
          <p>
            Seit unserer Gründung haben wir uns der Mission verschrieben, Weinliebhabern und Unternehmen die beste Weinberatung zu bieten. 
            Unser Team aus erfahrenen Sommeliers und Wein-Experten kombiniert jahrzehntelange Erfahrung mit modernsten Analysemethoden, 
            um Ihnen maßgeschneiderte Lösungen zu bieten.
          </p>
          <p>
            Was uns auszeichnet, ist nicht nur unser tiefes Fachwissen, sondern auch unsere Leidenschaft für Qualität und Innovation. 
            Jeder Wein, den wir empfehlen, durchläuft einen strengen Auswahlprozess und wird von unserem Expertenteam persönlich geprüft.
          </p>
        </div>

        <div class="founders-section">
          <h2>Unser Team</h2>
          <div class="founders-grid">
            <div class="founder-card">
              <div class="founder-image">
                <img src="/images/founders/founder1.jpg" alt="Max Mustermann" />
              </div>
              <h3>Max Mustermann</h3>
              <p class="founder-title">Geschäftsführer & Master Sommelier</p>
              <p class="founder-bio">
                Mit über 20 Jahren Erfahrung in der Weinbranche hat Max zahlreiche Auszeichnungen gewonnen 
                und ist ein gefragter Experte für Weinberatung und -verkostung.
              </p>
            </div>

            <div class="founder-card">
              <div class="founder-image">
                <img src="/images/founders/founder2.jpg" alt="Anna Schmidt" />
              </div>
              <h3>Anna Schmidt</h3>
              <p class="founder-title">Wein-Expertin & Beraterin</p>
              <p class="founder-bio">
                Anna bringt ihre internationale Erfahrung aus renommierten Weingütern ein 
                und ist spezialisiert auf die Entwicklung maßgeschneiderter Weinprogramme.
              </p>
            </div>

            <div class="founder-card">
              <div class="founder-image">
                <img src="/images/founders/founder3.jpg" alt="Thomas Weber" />
              </div>
              <h3>Thomas Weber</h3>
              <p class="founder-title">Technischer Leiter & Weinanalyst</p>
              <p class="founder-bio">
                Thomas ist verantwortlich für unsere modernen Analysemethoden und entwickelt 
                innovative Ansätze zur Qualitätssicherung und Weinbewertung.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  head() {
    return {
      title: 'Über Uns - Ihre Vertrauenswürdige Weinberatung',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Lernen Sie unser Team kennen - Experten für Weinberatung mit jahrelanger Erfahrung und Leidenschaft für Qualität.'
        }
      ]
    }
  }
}
</script>

<style scoped>
.about-page {
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/about-hero.jpg');
  background-size: cover;
  background-position: center;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 0 20px;
}

.hero-section h1 {
  margin-bottom: 1rem;
  font-weight: 700;
}

.subtitle {
  opacity: 0.9;
}

.trust-section {
  padding: 5rem 0;
  background-color: #f9f9f9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.intro-text {
  max-width: 800px;
  margin: 0 auto 4rem;
  text-align: center;
}

.intro-text h2 {
  margin-bottom: 2rem;
  color: #333;
}

.intro-text p {
  line-height: 1.8;
  color: #666;
  margin-bottom: 1.5rem;
}

.founders-section {
  text-align: center;
}

.founders-section h2 {
  margin-bottom: 3rem;
  color: #333;
}

.founders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.founder-card {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.founder-card:hover {
  transform: translateY(-5px);
}

.founder-image {
  width: 200px;
  height: 200px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
}

.founder-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.founder-card h3 {
  margin-bottom: 0.5rem;
  color: #333;
}

.founder-title {
  color: #666;
  margin-bottom: 1rem;
}

.founder-bio {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero-section h1 {
  }
  
  .subtitle {
  }
  
  .founders-grid {
    grid-template-columns: 1fr;
  }
}
</style> 