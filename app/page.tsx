import InfoNotes from "./_components/InfoNotes";
import PromtBar from "./_components/PromtBar";

export default function Home() {
  return (
    <div className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          What can I write for you?
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Compose an email or draft a blog post.
        </p>
      </div>
      

      <PromtBar />

      <InfoNotes />
    </div>
  );
}
