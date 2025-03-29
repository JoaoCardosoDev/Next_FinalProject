export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">BubbleUp Privacy Policy</h1>
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="mb-4 mt-8 text-2xl font-semibold">1. Data Collected</h2>
        <p className="mb-4">1.1. BubbleUp collects only the data necessary for the platform's operation, including:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Username associated with the Google, GitHub, or Discord account used for login.</li>
          <li>Posts and favourites created by the user.</li>
          <li>Functional cookies to maintain session login.</li>
        </ul>

        <h2 className="mb-4 mt-8 text-2xl font-semibold">2. Purpose of Data Processing</h2>
        <p className="mb-4">2.1. Data is used exclusively to enable BubbleUp's functionality, including:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>User authentication and access.</li>
          <li>Display of profiles and posts.</li>
          <li>Maintaining user session (functional cookies).</li>
        </ul>

        <h2 className="mb-4 mt-8 text-2xl font-semibold">3. Data Sharing</h2>
        <p className="mb-4">
          3.1. BubbleUp does not share users' personal data with third parties, except when required by law.
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold">4. User Rights</h2>
        <p className="mb-4">4.1. Users have the right to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access their personal data.</li>
          <li>Request correction or deletion of their data.</li>
          <li>Withdraw consent for data processing, subject to the necessity of maintaining account functionality.</li>
        </ul>

        <h2 className="mb-4 mt-8 text-2xl font-semibold">5. Data Retention</h2>
        <p className="mb-4">
          5.1. Data will be retained only while the user has an active account on BubbleUp.
        </p>
        <p className="mb-4">
          5.2. Users can request account deletion at any time.
        </p>

        <h2 className="mb-4 mt-8 text-2xl font-semibold">6. Contact</h2>
        <p className="mb-4">
          For questions regarding privacy and personal data, users can contact the BubbleUp team via email at [insert contact].
        </p>
      </div>
    </div>
  );
} 