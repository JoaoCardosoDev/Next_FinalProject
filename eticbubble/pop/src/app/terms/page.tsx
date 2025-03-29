export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">BubbleUp Terms and Conditions</h1>
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="mb-4 mt-8 text-2xl font-semibold">1. Introduction</h2>
        <p className="mb-4">
          BubbleUp is a social network that allows users to create and interact with content in a limited and controlled manner. Access is provided through third-party accounts (Google, GitHub, or Discord), and the username from these accounts will be displayed on the user's profile and posts. By using BubbleUp, the user agrees to these Terms and Conditions.
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold">2. Account and Access</h2>
        <p className="mb-4">
          2.1. Users can access BubbleUp through a Google, GitHub, or Discord account.
        </p>
        <p className="mb-4">
          2.2. The name associated with the external account will be visible on the user's profile and posts.
        </p>
        <p className="mb-4">
          2.3. Users are responsible for the security of their accounts and all associated activity.
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold">3. Features and Limitations</h2>
        <p className="mb-4">
          3.1. Each user can create up to 10 posts. To publish a new post, an existing post must be deleted.
        </p>
        <p className="mb-4">
          3.2. Users can view other users' profiles.
        </p>
        <p className="mb-4">
          3.3. Users can favourite up to 5 posts from other users.
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold">4. Privacy and Personal Data</h2>
        <p className="mb-4">
          4.1. BubbleUp collects and processes only the data necessary for the platform's operation, as described in the Privacy Policy.
        </p>
        <p className="mb-4">
          4.2. We do not use marketing cookies, only functional cookies to remember user logins.
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold">5. User Responsibilities</h2>
        <p className="mb-4">
          5.1. Users must not post illegal, offensive, or rights-infringing content.
        </p>
        <p className="mb-4">
          5.2. BubbleUp reserves the right to remove posts and/or block accounts that violate these Terms.
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold">6. Educational Project and Data Access</h2>
        <p className="mb-4">
          6.1. BubbleUp is a school project developed for ETIC_Algarve and managed by Giz, We Can Train You, a certified training entity in Portugal.
        </p>
        <p className="mb-4">
          6.2. ETIC_Algarve, its teachers, and trainers have access to the source code, as well as the users' information.
        </p>
        <p className="mb-4">
          6.3. This information will not be shared or sold to third parties and will only be used for training purposes under ETIC_Algarve.
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold">7. Changes to the Terms</h2>
        <p className="mb-4">
          These Terms may be updated periodically. Continued use of the platform implies acceptance of the new conditions.
        </p>
      </div>
    </div>
  );
}
