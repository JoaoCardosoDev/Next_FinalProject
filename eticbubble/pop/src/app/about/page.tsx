export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">About Bubble Up</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-4">
          Bubble Up is an educational project developed as part of the
          curriculum at ETIC_Algarve, under the supervision of Giz, We Can Train
          You - a certified training entity in Portugal. Our platform explores
          the concept of digital minimalism through a unique social sharing
          experience.
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold">Our Concept</h2>
        <p className="mb-4">
          In a world of endless scrolling and information overload, Bubble Up
          takes a different approach. We believe in quality over quantity,
          implementing a unique constraint that limits users to 10 active
          thoughts at any time. This limitation isn't a restriction—it's an
          invitation to be more mindful about what you share.
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold">How It Works</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Share your most meaningful thoughts (maximum 10 at a time)</li>
          <li>Curate your content by replacing old thoughts with new ones</li>
          <li>Connect with others through their Instagram profiles</li>
          <li>Favorite posts that resonate with you</li>
        </ul>

        <h2 className="mb-4 mt-8 text-2xl font-semibold">
          Educational Purpose
        </h2>
        <p className="mb-4">
          As an ETIC_Algarve project, Bubble Up serves as both a learning
          platform and a real-world application. While we maintain high
          standards of user privacy and data protection, the project's code and
          user information are accessible to ETIC_Algarve's teachers and
          trainers for educational purposes only.
        </p>

        <p className="mb-4">
          We use only essential cookies for user authentication, and we're
          committed to maintaining a safe, respectful environment for all users.
          Your data will never be sold or shared with third parties.
        </p>
      </div>
    </div>
  );
}
