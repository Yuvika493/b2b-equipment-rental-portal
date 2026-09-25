const STEPS = [
  {
    number: "01",
    title: "Browse",
    description: "Explore available equipment and compare options.",
  },
  {
    number: "02",
    title: "Book",
    description: "Choose your rental dates and submit your booking details.",
  },
  {
    number: "03",
    title: "Get to Work",
    description: "Confirm your rental and get the equipment you need for your project.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-heading__title">Rent Equipment in Three Simple Steps</h2>
        </div>

        <div className="steps-grid">
          {STEPS.map((step) => (
            <div className="step-card" key={step.number}>
              <span className="step-card__number">{step.number}</span>
              <h3 className="step-card__title">{step.title}</h3>
              <p className="step-card__description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
