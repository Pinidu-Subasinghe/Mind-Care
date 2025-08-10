export default function Section({ id, children }) {
  return (
    <section
      id={id}
      className="max-w-7xl mx-auto px-6"
      // scroll-mt-20 offsets fixed header height on scroll
    >
      <div>{children}</div>
    </section>
  );
}
